
function Field({ label, ...props }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <input
        {...props}
        className="w-full text-sm border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
    </label>
  );
}
export default Field;