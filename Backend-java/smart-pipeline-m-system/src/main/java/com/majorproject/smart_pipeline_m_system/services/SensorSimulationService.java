
package com.majorproject.smart_pipeline_m_system.services;

import com.majorproject.smart_pipeline_m_system.model.PipelineModel;
import com.majorproject.smart_pipeline_m_system.model.PipelineSensorData;
import com.majorproject.smart_pipeline_m_system.repository.PipelineSensorDataRepo;
import com.majorproject.smart_pipeline_m_system.repository.PipelinerRepo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class SensorSimulationService {

    private final PipelinerRepo pipelineRepository;
    private final PipelineSensorDataRepo sensorDataRepository;
    private final ResourceLoader resourceLoader;
    private final RestClient restClient;

    @Value("${python.ai.url:http://localhost:8000}")
    private String pythonAiUrl;

    // Demo thresholds. Replace with validated engineering limits.
    private static final double MIN_PRESSURE = 1.5;
    private static final double MIN_FLOW = 20.0;
    private static final double MAX_TEMPERATURE = 40.0;
    private static final double MAX_MOTION = 0.8;
    private static final double MAX_VIBRATION = 5.0;

    private enum SimulationCondition {
        HEALTHY,
        MODERATE,
        CRITICAL
    }

    public SensorSimulationService(
            PipelinerRepo pipelineRepository,
            PipelineSensorDataRepo sensorDataRepository,
            ResourceLoader resourceLoader,
            RestClient.Builder restClientBuilder
    ) {
        this.pipelineRepository = pipelineRepository;
        this.sensorDataRepository = sensorDataRepository;
        this.resourceLoader = resourceLoader;
        this.restClient = restClientBuilder.build();
    }

    /**
     * Generates sensor readings for all pipelines.
     *
     * Existing sensor records are updated.
     * Missing sensor records are inserted.
     */
    @Transactional
    public ResponseEntity<Object> generateRandomData() {

        List<PipelineModel> pipelines = pipelineRepository.findAll();

        if (pipelines.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Map<String, Object>> results = new ArrayList<>();

        // Cycle through all three conditions.
        SimulationCondition[] conditions = SimulationCondition.values();

        int index = 0;
        int updatedCount = 0;
        int createdCount = 0;
        int aiTriggeredCount = 0;

        for (PipelineModel pipeline : pipelines) {

            SimulationCondition selectedCondition =
                    conditions[index % conditions.length];

            index++;

            // 1. Generate readings based on the selected condition.
            Map<String, Double> readings =
                    generateSensorValues(selectedCondition);

            double pressure = readings.get("pressure");
            double flow = readings.get("flow");
            double temperature = readings.get("temperature");
            double motion = readings.get("motion");
            double vibration = readings.get("vibration");

            // 2. Verify actual sensor thresholds.
            boolean critical = isCritical(
                    pressure, flow, temperature, motion, vibration
            );

            // 3. Calculate condition score.
            double conditionValue = calculateCondition(
                    pressure, flow, temperature, motion, vibration
            );
            switch (selectedCondition) {

                case HEALTHY -> {
                    conditionValue = Math.max(70.0, conditionValue);
                    conditionValue = Math.min(100.0, conditionValue);
                }

                case MODERATE -> {
                    conditionValue = Math.max(40.0, conditionValue);
                    conditionValue = Math.min(69.0, conditionValue);
                }

                case CRITICAL -> {
                    conditionValue = Math.min(39.0, conditionValue);
                }
            }
            String status = getStatus(conditionValue);

            // Ensure the critical scenario always remains critical.
            if (critical) {
                status = "CRITICAL";
                conditionValue = Math.min(conditionValue, 39.0);
            }

            // 4. Find existing record for this pipeline.
            Optional<PipelineSensorData> existing =
                    sensorDataRepository.findByPipeline_Id(
                            pipeline.getId()
                    );

            boolean isNewRecord = existing.isEmpty();

            PipelineSensorData data = existing.orElseGet(
                    PipelineSensorData::new
            );

            // 5. Update pipeline relationship and sensor readings.
            data.setPipeline(pipeline);

            data.setPressureSensor(pressure);
            data.setFlowMeter(flow);
            data.setWaterTemperature(temperature);
            data.setMotionSensor(motion);
            data.setVibrationSensor(vibration);

            Map<String, Object> aiResult = null;
            String aiError = null;

            // 6. Trigger AI only when critical.
            if (critical) {

                try {
                    aiResult = captureAndAnalyzeImage();

                    // AI result is supplementary. Sensor thresholds
                    // determine the final sensor condition status.
                    conditionValue = Math.min(
                            getDouble(aiResult, "conditionValue", conditionValue),
                            39.0
                    );

                    status = "CRITICAL";

                    aiTriggeredCount++;

                } catch (Exception ex) {

                    // Preserve critical status even if AI is unavailable.
                    status = "CRITICAL";
                    conditionValue = Math.min(conditionValue, 39.0);

                    aiError = ex.getMessage();
                }
            }

            data.setConditionValue(conditionValue);
            data.setConditionStatus(status);

            // 7. Save: insert if new, update if existing.
            PipelineSensorData saved =
                    sensorDataRepository.save(data);

            if (isNewRecord) {
                createdCount++;
            } else {
                updatedCount++;
            }

            // 8. Prepare response.
            Map<String, Object> result = new LinkedHashMap<>();

            result.put("pipelineId", pipeline.getId());
            result.put("pipelineCode", pipeline.getPipelineCode());

            result.put("sensorDataId", saved.getId());

            result.put("operation", isNewRecord ? "CREATED" : "UPDATED");
            result.put("pressure", pressure);
            result.put("flow", flow);
            result.put("temperature", temperature);
            result.put("motion", motion);
            result.put("vibration", vibration);

            result.put("conditionValue", saved.getConditionValue());
            result.put("conditionStatus", saved.getConditionStatus());

            result.put("imageAnalysisTriggered", critical);
            result.put("aiAnalysisResult", aiResult);
            result.put("aiError", aiError);

            result.put("simulated", true);

            results.add(result);
        }

        Map<String, Object> response = new LinkedHashMap<>();

        response.put(
                "message",
                "Sensor simulation completed successfully"
        );

        response.put("totalPipelines", pipelines.size());
        response.put("createdRecords", createdCount);
        response.put("updatedRecords", updatedCount);
        response.put("aiTriggeredCount", aiTriggeredCount);

        response.put("data", results);

        return ResponseEntity.ok(response);
    }

    /**
     * Generate different sensor ranges for all three conditions.
     */
    private Map<String, Double> generateSensorValues(
            SimulationCondition condition
    ) {

        Map<String, Double> values = new LinkedHashMap<>();

        switch (condition) {

            case HEALTHY -> {

                values.put("pressure", random(3.5, 4.8));
                values.put("flow", random(45.0, 60.0));
                values.put("temperature", random(20.0, 28.0));
                values.put("motion", random(0.0, 0.25));
                values.put("vibration", random(0.0, 1.5));
            }

            case MODERATE -> {

                values.put("pressure", random(1.8, 2.2));
                values.put("flow", random(24.0, 30.0));
                values.put("temperature", random(35.0, 38.0));
                values.put("motion", random(0.4, 0.65));
                values.put("vibration", random(3.5, 4.8));
            }

            case CRITICAL -> {

                // At least one threshold is crossed.
                values.put("pressure", random(0.5, 1.4));
                values.put("flow", random(5.0, 18.0));
                values.put("temperature", random(41.0, 50.0));
                values.put("motion", random(0.9, 1.5));
                values.put("vibration", random(5.5, 8.0));
            }
        }

        return values;
    }

    /**
     * Check whether any sensor crosses its critical threshold.
     */
    private boolean isCritical(
            double pressure,
            double flow,
            double temperature,
            double motion,
            double vibration
    ) {

        return pressure < MIN_PRESSURE
                || flow < MIN_FLOW
                || temperature > MAX_TEMPERATURE
                || motion > MAX_MOTION
                || vibration > MAX_VIBRATION;
    }

    private double random(double min, double max) {

        double value = ThreadLocalRandom.current()
                .nextDouble(min, max);

        return Math.round(value * 100.0) / 100.0;
    }

    /**
     * Demo condition score: 0 to 100.
     */
    private double calculateCondition(
            double pressure,
            double flow,
            double temperature,
            double motion,
            double vibration
    ) {

        double pressureScore = normalize(pressure, 1.0, 5.0);

        double flowScore = normalize(flow, 0.0, 60.0);

        double temperatureScore =
                100.0 - normalize(temperature, 20.0, 50.0);

        double motionScore =
                100.0 - normalize(motion, 0.0, 1.5);

        double vibrationScore =
                100.0 - normalize(vibration, 0.0, 8.0);

        double score =
                pressureScore * 0.20 +
                        flowScore * 0.30 +
                        temperatureScore * 0.20 +
                        motionScore * 0.10 +
                        vibrationScore * 0.20;

        return Math.round(score * 100.0) / 100.0;
    }

    private double normalize(
            double value,
            double min,
            double max
    ) {

        return Math.max(
                0,
                Math.min(
                        100,
                        ((value - min) / (max - min)) * 100
                )
        );
    }

    private String getStatus(double conditionValue) {

        if (conditionValue >= 70) {
            return "HEALTHY";
        }

        if (conditionValue >= 40) {
            return "MODERATE";
        }

        return "CRITICAL";
    }

    /**
     * Read the static image used by the prototype.
     */
    private byte[] captureImage() throws IOException {

        Resource image = resourceLoader.getResource(
                "classpath:static/demo-pipeline.jpg"
        );

        if (!image.exists()) {
            throw new IOException(
                    "Demo pipeline image not found"
            );
        }

        try (var inputStream = image.getInputStream()) {
            return inputStream.readAllBytes();
        }
    }

    /**
     * Send static image to Python FastAPI.
     */
    private Map<String, Object> captureAndAnalyzeImage()
            throws IOException {

        byte[] imageBytes = captureImage();

        ByteArrayResource imageResource =
                new ByteArrayResource(imageBytes) {

                    @Override
                    public String getFilename() {
                        return "pipeline-inspection.jpg";
                    }
                };

        MultiValueMap<String, Object> body =
                new LinkedMultiValueMap<>();

        body.add("file", imageResource);

        Map<String, Object> response = restClient.post()
                .uri(pythonAiUrl + "/api/inspection/analyze")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(Map.class);

        if (response == null) {
            throw new IllegalStateException(
                    "Empty response from Python AI service"
            );
        }

        return response;
    }

    private double getDouble(
            Map<String, Object> map,
            String key,
            double fallback
    ) {

        Object value = map.get(key);

        if (value instanceof Number number) {
            return number.doubleValue();
        }

        return fallback;
    }
}
