package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import org.springframework.http.ResponseEntity;

public interface User {
    public ResponseEntity<AuthResponse> login(UserBaseModel user);
    public boolean regester();
}
