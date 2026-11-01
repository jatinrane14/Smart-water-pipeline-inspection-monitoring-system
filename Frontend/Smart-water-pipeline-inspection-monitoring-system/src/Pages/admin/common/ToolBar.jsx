import React from 'react'
import { Search,Plus } from 'lucide-react'
const Toolbar = ({ searchPlaceholder, onAddClick, addLabel }) => {
  return (
    <React.Fragment>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder || "Search..."}
            className="pl-7 pr-3 py-1.5 text-sm border border-gray-300 rounded w-56 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <select className="text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-600">
          <option>All Status</option>
          <option>Active</option>
          <option>Flagged</option>
        </select>
      </div>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-3 py-1.5 rounded"
        >
          <Plus size={14} /> {addLabel}
        </button>
      )}
    </div>
    </React.Fragment>
    )
}

export default Toolbar
