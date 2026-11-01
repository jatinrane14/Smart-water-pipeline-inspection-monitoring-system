package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicUserController implements User{
    @Override
    public ResponseEntity<AuthResponse> login(UserBaseModel user) {
        return null;
    }

    @Override
    public boolean regester() {
        return false;
    }
}
