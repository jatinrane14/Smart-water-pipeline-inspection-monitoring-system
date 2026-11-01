package com.majorproject.smart_pipeline_m_system.repository;

import com.majorproject.smart_pipeline_m_system.model.PipelineSensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PipelineSensorDataRepo extends JpaRepository<PipelineSensorData,Long> {
    Optional<PipelineSensorData> findByPipeline_Id(Long pipelineId);
}
