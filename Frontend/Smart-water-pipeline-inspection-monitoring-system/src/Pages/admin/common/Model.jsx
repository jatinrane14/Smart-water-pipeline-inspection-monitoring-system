function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className={`bg-white rounded border border-gray-200 shadow-lg w-full ${wide ? "max-w-2xl" : "max-w-md"}`}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
export default Modal;