package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.model.PipelineModel;
import com.majorproject.smart_pipeline_m_system.services.PipelineServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class PipelineController {
    @Autowired
    PipelineServices pipelineServices;

    @GetMapping("/get/all/pipelines")
    public ResponseEntity<List<PipelineModel>> getAllPipelines(){
        return pipelineServices.getPipelines();
    }

    @PostMapping("/add/pipeline")
    public ResponseEntity<PipelineModel> addNewPipelines(@RequestBody Map<String,Object> data){
        System.out.print(data);
        return pipelineServices.addPipeline(data);
    }


    @PostMapping("/generate")
    public ResponseEntity<Object> generateRandomData() {
        return pipelineServices.generateRandomData();
    }
}
