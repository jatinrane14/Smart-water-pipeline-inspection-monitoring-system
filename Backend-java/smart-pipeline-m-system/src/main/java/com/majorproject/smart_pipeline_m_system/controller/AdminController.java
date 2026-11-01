package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.dto.AuthResponse;
import com.majorproject.smart_pipeline_m_system.model.UserBaseModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/admin")
@RestController
public class AdminController implements User{

    @Override
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserBaseModel user){
        boolean matched = true;
        if(matched){
            return ResponseEntity.ok( new AuthResponse(true,"hello","","ADMIN","Management"));
        }
        return null;
    }

    @Override
    public boolean regester() {
        return false;
    }
}
