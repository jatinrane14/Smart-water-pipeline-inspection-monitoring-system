package com.majorproject.smart_pipeline_m_system.projection;

import java.time.LocalDateTime;

public interface PipelineSensorFullJoinProjection {

    Long getPipelineId();
    String getPipelineCode();
    String getPipelineName();
    Integer getDiameterMm();
    String getMaterial();

    String getRoutes();

    LocalDateTime getCreatedAt();
    Double getLengthM();
    String getOperationalStatus();
    String getZone();

    Long getSensorDataId();
    Double getPressureSensor();
    Double getFlowMeter();
    Double getWaterTemperature();
    Double getMotionSensor();
    Double getVibrationSensor();
    Double getConditionValue();
    String getConditionStatus();
    LocalDateTime getRecordedAt();
}