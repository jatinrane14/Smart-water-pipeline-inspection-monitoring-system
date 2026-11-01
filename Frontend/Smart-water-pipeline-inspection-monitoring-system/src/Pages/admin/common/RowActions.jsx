import { Eye,Pencil,Trash2 } from "lucide-react";
function RowActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      {onView && (
        <button onClick={onView} className="hover:text-blue-700" title="View">
          <Eye size={15} />
        </button>
      )}
      {onEdit && (
        <button onClick={onEdit} className="hover:text-blue-700" title="Edit">
          <Pencil size={15} />
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className="hover:text-red-600" title="Delete">
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}
export default RowActions;