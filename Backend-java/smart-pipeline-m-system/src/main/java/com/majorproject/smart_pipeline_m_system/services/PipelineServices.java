package com.majorproject.smart_pipeline_m_system.services;

import com.majorproject.smart_pipeline_m_system.model.PipelineModel;
import com.majorproject.smart_pipeline_m_system.model.PipelineSensorData;
import com.majorproject.smart_pipeline_m_system.projection.PipelineSensorFullJoinProjection;
import com.majorproject.smart_pipeline_m_system.repository.PipelineRepository;
import com.majorproject.smart_pipeline_m_system.repository.PipelineSensorDataRepo;
import com.majorproject.smart_pipeline_m_system.repository.PipelinerRepo;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;

import static java.lang.Math.random;

@Service
public class PipelineServices {
    @Autowired
    PipelinerRepo pipelinerRepo;


    PipelineSensorDataRepo pipelineSensorDataRepo;
    @Autowired
    PipelineRepository pipelineRepository;

    @Transactional(readOnly = true)
    public List<PipelineSensorFullJoinProjection> getAllPipelinesWithSensorData() {

        return pipelineRepository.findAllPipelinesWithSensorData();
    }



    public ResponseEntity<PipelineModel> addPipeline(Map<String,Object> pipelineDetail){
        List<List<Double>> coordinates =
                (List<List<Double>>) pipelineDetail.get("route");

        Coordinate[] points = coordinates.stream()
                .map(point -> new Coordinate(
                        point.get(0),
                        point.get(1)
                ))
                .toArray(Coordinate[]::new);

        GeometryFactory factory = new GeometryFactory();

        LineString route = factory.createLineString(points);

        PipelineModel pipeline = new PipelineModel();

        pipeline.setPipelineCode((String) pipelineDetail.get("pipelineCode"));
        pipeline.setPipelineName((String) pipelineDetail.get("pipelineName"));
        pipeline.setDiameterMm((Integer) pipelineDetail.get("diameterMm"));
        pipeline.setMaterial((String) pipelineDetail.get("material"));
        pipeline.setLengthM((Double) pipelineDetail.get("lengthM"));
        pipeline.setInstallationDate(
                LocalDateTime.parse((String) pipelineDetail.get("installationDate"))
        );
        pipeline.setOperationalStatus((String)pipelineDetail.get("operationalStatus"));
        pipeline.setZone((String)pipelineDetail.get("zone"));
        pipeline.setRoute(route);
        PipelineModel res  = pipelinerRepo.save(pipeline);
        System.out.print(res);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }


}

