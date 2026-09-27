import PipelineMap from "../components/map/Pipeline";
function App() {
  return (    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="mb-2 text-3xl font-bold">
        Aqua-Sentry
      </h1>

      <p className="mb-6 text-gray-600">
        Smart Water Pipeline Inspection & Monitoring
      </p>

      <PipelineMap />

    </div>
  );
}

export default App;