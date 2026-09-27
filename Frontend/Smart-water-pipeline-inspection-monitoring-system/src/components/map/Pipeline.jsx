import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function PipelineMap() {
  const [pipelines, setPipelines] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/pipelines.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load GeoJSON: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log("Pipeline GeoJSON:", data);

        if (
          data.type !== "FeatureCollection" ||
          !Array.isArray(data.features)
        ) {
          throw new Error("Invalid GeoJSON FeatureCollection");
        }

        setPipelines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Pipeline map error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getPipelineStyle = (feature) => {
    const condition = feature?.properties?.condition;

    if (condition === "DAMAGED") {
      return {
        color: "#dc2626",
        weight: 8,
        opacity: 1,
      };
    }

    if (condition === "MODERATE") {
      return {
        color: "#eab308",
        weight: 7,
        opacity: 1,
      };
    }

    return {
      color: "#2563eb",
      weight: 6,
      opacity: 1,
    };
  };

  const onEachPipeline = (feature, layer) => {
    const data = feature.properties;

    layer.bindPopup(`
      <div style="
        min-width: 230px;
        font-family: Arial, sans-serif;
      ">

        <h3 style="
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 700;
        ">
          ${data.pipelineId}
        </h3>

        <p>
          <strong>Pipeline:</strong>
          ${data.pipelineName}
        </p>

        <p>
          <strong>Diameter:</strong>
          ${data.diameterMm} mm
        </p>

        <p>
          <strong>Condition:</strong>
          ${data.condition}
        </p>

        <p>
          <strong>Severity:</strong>
          ${data.severity}/100
        </p>

        <p>
          <strong>Defect:</strong>
          ${data.defectType}
        </p>

        <p>
          <strong>Last Inspection:</strong>
          ${data.lastInspection}
        </p>

      </div>
    `);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "650px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading pipeline map...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          color: "#b91c1c",
          background: "#fef2f2",
        }}
      >
        <strong>Map Error:</strong> {error}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "650px",
      }}
    >
      <MapContainer
        center={[22.7217, 75.8562]}
        zoom={14}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={pipelines}
          style={getPipelineStyle}
          onEachFeature={onEachPipeline}
        />
      </MapContainer>

      <MapLegend />
    </div>
  );
}

function MapLegend() {
  return (
    <div
      style={{
        position: "absolute",
        left: "20px",
        bottom: "20px",
        zIndex: 1000,
        background: "white",
        padding: "15px 18px",
        borderRadius: "8px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          fontWeight: "700",
          marginBottom: "12px",
        }}
      >
        Pipeline Condition
      </div>

      <LegendItem
        color="#2563eb"
        label="Normal"
      />

      <LegendItem
        color="#eab308"
        label="Moderate Damage"
      />

      <LegendItem
        color="#dc2626"
        label="Critical / Damaged"
      />
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px",
        fontSize: "14px",
      }}
    >
      <span
        style={{
          width: "35px",
          height: "5px",
          backgroundColor: color,
          display: "inline-block",
          borderRadius: "3px",
        }}
      />

      <span>{label}</span>
    </div>
  );
}

export default PipelineMap;