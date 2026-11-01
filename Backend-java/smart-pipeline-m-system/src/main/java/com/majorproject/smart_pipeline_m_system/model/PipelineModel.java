package com.majorproject.smart_pipeline_m_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.locationtech.jts.geom.LineString;
//import org.locationtech.jts.geom.LineString;

import java.time.LocalDateTime;

@Table(name = "pipelines")
@Entity
public class PipelineModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pipeline_code", nullable = false, unique = true, length = 50)
    private String pipelineCode;

    @Column(name = "pipeline_name", nullable = false, length = 150)
    private String pipelineName;

    @Column(name = "diameter_mm")
    private Integer diameterMm;

    @Column(name = "material", length = 50)
    private String material;

    @Column(name = "length_m")
    private Double lengthM;

    @Column(name = "installation_date")
    private LocalDateTime installationDate;

    @Column(name = "operational_status", nullable = false, length = 30)
    private String operationalStatus = "ACTIVE";

    @Column(name = "zone", length = 100)
    private String zone;

    @Column(name="route", columnDefinition = "LINESTRING")
    @JsonIgnore
    private LineString route;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }


    public Long getId() {
        return id;
    }

    public String getPipelineCode() {
        return pipelineCode;
    }

    public void setPipelineCode(String pipelineCode) {
        this.pipelineCode = pipelineCode;
    }

    public String getPipelineName() {
        return pipelineName;
    }

    public void setPipelineName(String pipelineName) {
        this.pipelineName = pipelineName;
    }

    public Integer getDiameterMm() {
        return diameterMm;
    }

    public void setDiameterMm(Integer diameterMm) {
        this.diameterMm = diameterMm;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Double getLengthM() {
        return lengthM;
    }

    public void setLengthM(Double lengthM) {
        this.lengthM = lengthM;
    }

    public LocalDateTime getInstallationDate() {
        return installationDate;
    }

    public void setInstallationDate(LocalDateTime installationDate) {
        this.installationDate = installationDate;
    }

    public String getOperationalStatus() {
        return operationalStatus;
    }

    public void setOperationalStatus(String operationalStatus) {
        this.operationalStatus = operationalStatus;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public LineString getRoute() {
        return route;
    }

    public void setRoute(LineString route) {
        this.route = route;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
