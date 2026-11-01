package com.majorproject.smart_pipeline_m_system.controller;

import com.majorproject.smart_pipeline_m_system.model.PipelineModel;
import com.majorproject.smart_pipeline_m_system.projection.PipelineSensorFullJoinProjection;
import com.majorproject.smart_pipeline_m_system.services.PipelineServices;
import com.majorproject.smart_pipeline_m_system.services.SensorSimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
public class PipelineController {
    @Autowired
    PipelineServices pipelineServices;
    @Autowired
    SensorSimulationService sensorSimulationService;

//    @GetMapping("/get/all/pipelines")
//    public ResponseEntity<List<PipelineModel>> getAllPipelines(){
//        return pipelineServices.getPipelines();
//    }

    @GetMapping("/sensor-data")
    public ResponseEntity<List<PipelineSensorFullJoinProjection>>
    getAllPipelinesWithSensorData() {

        List<PipelineSensorFullJoinProjection> data =
                pipelineServices.getAllPipelinesWithSensorData();

        return ResponseEntity.ok(data);
    }
    @PostMapping("/add/pipeline")
    public ResponseEntity<PipelineModel> addNewPipelines(@RequestBody Map<String,Object> data){
        System.out.print(data);
        return pipelineServices.addPipeline(data);
    }


    @PostMapping("/generate/data")
    public ResponseEntity<Object> generateRandomData() {
        return sensorSimulationService.generateRandomData();
    }
}
