package com.majorproject.smart_pipeline_m_system.projection;


public interface PipelineSensorFullJoinProjection {

    Long getPipelineId();

    String getPipelineCode();

    String getPipelineName();

    Integer getDiameterMm();

    String getMaterial();

    String getOperationalStatus();

    Long getSensorDataId();

    Double getPressureSensor();

    Double getFlowMeter();

    Double getWaterTemperature();

    Double getMotionSensor();

    Double getVibrationSensor();

    Double getConditionValue();

    String getConditionStatus();

    java.time.LocalDateTime getRecordedAt();
}
