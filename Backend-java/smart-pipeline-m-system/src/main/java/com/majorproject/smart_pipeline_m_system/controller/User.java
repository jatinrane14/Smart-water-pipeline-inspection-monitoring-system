package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface User<T extends UserBaseModel> {
    public ResponseEntity<AuthResponse> login(T user);
    public ResponseEntity<Map<String,String>> regester(T user);
}
