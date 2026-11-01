package com.majorproject.smart_pipeline_m_system.repository;

import com.majorproject.smart_pipeline_m_system.model.CitizenUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenUserRepo extends JpaRepository<CitizenUserModel,Long> {
    UserBaseModel findByUserEmail(String userEmail);
}
