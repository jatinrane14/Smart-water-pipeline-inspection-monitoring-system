package com.majorproject.smart_pipeline_m_system.repository;

import com.majorproject.smart_pipeline_m_system.model.PipelineModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PipelinerRepo extends JpaRepository<PipelineModel,Long> {
}
