package com.majorproject.smart_pipeline_m_system.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Table(name = "pipeline_sensor_data")
@Entity
public class PipelineSensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "pipeline_code",
            referencedColumnName = "pipeline_code",
            nullable = false
    )
    private PipelineModel pipeline;

    @Column(name = "pressure_sensor")
    private Double pressureSensor;

    @Column(name = "flow_meter")
    private Double flowMeter;

    @Column(name = "water_temperature")
    private Double waterTemperature;

    @Column(name = "motion_sensor")
    private Double motionSensor;

    @Column(name = "vibration_sensor")
    private Double vibrationSensor;

    @Column(name = "condition_value")
    private Double conditionValue;

    @Column(name = "condition_status")
    private String conditionStatus;

    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;

    @PrePersist
    protected void onCreate() {
        if (recordedAt == null) {
            recordedAt = LocalDateTime.now();
        }
    }

    public PipelineSensorData() {}

    public Long getId() {
        return id;
    }

    public PipelineModel getPipeline() {
        return pipeline;
    }

    public void setPipeline(PipelineModel pipeline) {
        this.pipeline = pipeline;
    }

    public Double getPressureSensor() {
        return pressureSensor;
    }

    public void setPressureSensor(Double pressureSensor) {
        this.pressureSensor = pressureSensor;
    }

    public Double getFlowMeter() {
        return flowMeter;
    }

    public void setFlowMeter(Double flowMeter) {
        this.flowMeter = flowMeter;
    }

    public Double getWaterTemperature() {
        return waterTemperature;
    }

    public void setWaterTemperature(Double waterTemperature) {
        this.waterTemperature = waterTemperature;
    }

    public Double getMotionSensor() {
        return motionSensor;
    }

    public void setMotionSensor(Double motionSensor) {
        this.motionSensor = motionSensor;
    }

    public Double getVibrationSensor() {
        return vibrationSensor;
    }

    public void setVibrationSensor(Double vibrationSensor) {
        this.vibrationSensor = vibrationSensor;
    }

    public Double getConditionValue() {
        return conditionValue;
    }

    public void setConditionValue(Double conditionValue) {
        this.conditionValue = conditionValue;
    }

    public String getConditionStatus() {
        return conditionStatus;
    }

    public void setConditionStatus(String conditionStatus) {
        this.conditionStatus = conditionStatus;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }
}
