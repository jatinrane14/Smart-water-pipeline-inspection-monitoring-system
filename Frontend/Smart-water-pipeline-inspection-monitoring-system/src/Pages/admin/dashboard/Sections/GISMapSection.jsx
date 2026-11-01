import { useState } from "react";
import PageHeader from "../../common/Shared UI Primitives/PageHeader";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Polyline } from "react-leaflet";
import { Popup } from "react-leaflet";

function conditionColor(condition) {
  if (condition === "HEALTHY") return "#2563eb"; // blue
  if (condition === "MODERATE") return "#f59e0b"; // yellow/amber
  return "#dc2626"; // damaged / critical -> red
}


function GISMapSection({PIPELINES}) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = PIPELINES.filter((p) => filter === "All" || p.conditionStatus === filter);

  return (
    <div>
      <PageHeader
        title="GIS Pipeline Map"
        subtitle="Network-wide geographic view of pipeline condition"
        action={
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option>All</option>
            <option>Normal</option>
            <option>Moderate</option>
            <option>Damaged</option>
            <option>Critical</option>
          </select>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded overflow-hidden" style={{ height: 480 }}>
          <MapContainer center={[22.7196, 75.8577]} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; MapTiler &copy; OpenStreetMap contributors'
              url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=WR79BkqFA9YgZpFyNBQF"
            />
            {filtered.map((p) =>
              p.route && p.route.length > 1 ? (
                <Polyline
                  key={p.id}
                  positions={p.route.map(([x, y]) => [y, x])}
                  pathOptions={{ color: conditionColor(p.conditionStatus), weight: 5 }}
                  eventHandlers={{ click: () => setSelected(p) }}
                >
                  <Popup>
                    <div className="text-xs">
                      <p className="font-semibold">{p.pipelineName}</p>
                      <p>ID: {p.pipelineCode}</p>
                      <p>Diameter: {p.diameterMm}</p>
                      <p>Condition: {p.condition}</p>
                      <p>Last Inspection: {p.updatedAt}</p>
                    </div>
                  </Popup>
                </Polyline>
              ) : null
            )}
          </MapContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Map Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#2563eb" }} />
                <span className="text-gray-600">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
                <span className="text-gray-600">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#dc2626" }} />
                <span className="text-gray-600">Damaged / Critical</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Selected Pipeline</h3>
            {!selected && <p className="text-xs text-gray-400">Click a line on the map to see details.</p>}
            {selected && (
              <div className="text-xs text-gray-600 space-y-1">
                <p><span className="text-gray-400">ID:</span> {selected.id}</p>
                <p><span className="text-gray-400">Name:</span> {selected.name}</p>
                <p><span className="text-gray-400">Diameter:</span> {selected.diameter}</p>
                <p><span className="text-gray-400">Condition:</span> {selected.condition}</p>
                <p><span className="text-gray-400">Severity:</span> {selected.condition === "Normal" ? "None" : selected.condition}</p>
                <p><span className="text-gray-400">Last Inspection:</span> {selected.lastInspection}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GISMapSection;