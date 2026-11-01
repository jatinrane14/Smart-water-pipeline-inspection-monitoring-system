package com.majorproject.smart_pipeline_m_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Table(name="Admin")
@Entity
public class AdminUserModel extends UserBaseModel{
    private String desigination;

    public String getDesigination() {
        return desigination;
    }

    public void setDesigination(String desigination) {
        this.desigination = desigination;
    }
}
