package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.AdminUserModel;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import com.majorproject.smart_pipeline_m_system.services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RequestMapping("/api/admin")
@RestController
public class AdminController implements User<AdminUserModel>{
    @Autowired
    AdminServices adminServices;
    @Override
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AdminUserModel user){
        return adminServices.login(user);
    }

    @Override
    public ResponseEntity<Map<String, String>> regester(AdminUserModel user) {
        Map<String,String> result = new HashMap<>();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
