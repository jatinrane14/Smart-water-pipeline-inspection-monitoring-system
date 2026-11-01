package com.majorproject.smart_pipeline_m_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CitizenComplaint {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
}
