package com.majorproject.smart_pipeline_m_system.repository;

import com.majorproject.smart_pipeline_m_system.model.AdminUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUserRepo extends JpaRepository<AdminUserModel,Long> {
    UserBaseModel findByUserEmail(String userEmail);
}
