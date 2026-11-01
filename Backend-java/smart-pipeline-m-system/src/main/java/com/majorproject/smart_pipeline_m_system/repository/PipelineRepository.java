package com.majorproject.smart_pipeline_m_system.repository;

import java.util.List;

import com.majorproject.smart_pipeline_m_system.model.PipelineModel;
import com.majorproject.smart_pipeline_m_system.model.PipelineSensorData;
import com.majorproject.smart_pipeline_m_system.projection.PipelineSensorFullJoinProjection;
import com.majorproject.smart_pipeline_m_system.repository.PipelineSensorDataRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface PipelineRepository extends JpaRepository<PipelineModel, Long> {

    @Query(value = """
        SELECT
            p.id AS pipelineId,
            p.pipeline_code AS pipelineCode,
            p.pipeline_name AS pipelineName,
            p.diameter_mm AS diameterMm,
            p.material AS material,
            p.operational_status AS operationalStatus,
            ST_AsGeoJSON(p.route) AS routes,
            p.zone AS zone,
            p.created_at AS createdAt,
            p.length_m AS lengthM,
            
            s.id AS sensorDataId,
            s.pressure_sensor AS pressureSensor,
            s.flow_meter AS flowMeter,
            s.water_temperature AS waterTemperature,
            s.motion_sensor AS motionSensor,
            s.vibration_sensor AS vibrationSensor,
            s.condition_value AS conditionValue,
            s.condition_status AS conditionStatus,
            s.recorded_at AS recordedAt

        FROM pipelines p
        LEFT JOIN pipeline_sensor_data s
            ON p.pipeline_code = s.pipeline_code

        UNION ALL

        SELECT
            p.id AS pipelineId,
            s.pipeline_code AS pipelineCode,
            p.pipeline_name AS pipelineName,
            p.diameter_mm AS diameterMm,
            p.material AS material,
            p.operational_status AS operationalStatus,
            ST_AsGeoJSON(p.route) AS routes,
            p.zone AS zone,
            p.created_at AS createdAt,
            p.length_m AS lengthM,
            
            s.id AS sensorDataId,
            s.pressure_sensor AS pressureSensor,
            s.flow_meter AS flowMeter,
            s.water_temperature AS waterTemperature,
            s.motion_sensor AS motionSensor,
            s.vibration_sensor AS vibrationSensor,
            s.condition_value AS conditionValue,
            s.condition_status AS conditionStatus,
            s.recorded_at AS recordedAt

        FROM pipeline_sensor_data s
        LEFT JOIN pipelines p
            ON p.pipeline_code = s.pipeline_code

        WHERE p.id IS NULL

        ORDER BY pipelineCode, recordedAt DESC
        """, nativeQuery = true)
    List<PipelineSensorFullJoinProjection> findAllPipelinesWithSensorData();
}
