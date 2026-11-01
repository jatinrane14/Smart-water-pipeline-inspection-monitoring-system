package com.majorproject.smart_pipeline_m_system.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
public class TestController {
    @GetMapping("/")
    public static String test(){
        return "Jatin";
    }
}
