package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.CitizenUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import com.majorproject.smart_pipeline_m_system.services.CitizenServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin
@RequestMapping("/api")
@RestController
public class PublicUserController implements User<CitizenUserModel>{
    @Autowired
    CitizenServices citizenServices;

    @PostMapping("/login")
    @Override
    public ResponseEntity<AuthResponse> login(@RequestBody CitizenUserModel user) {
        return citizenServices.login(user);
    }

    @PostMapping("/regester")
    @Override
    public ResponseEntity<Map<String,String>> regester(@RequestBody CitizenUserModel user) {
        return citizenServices.regester((CitizenUserModel) user);
    }
}
