import React from 'react'
function DataTable({ columns, rows }) {
  return (
    <div className="bg-white border border-gray-200 rounded overflow-x-auto">
      <table className="w-full text-sm min-w-max">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="text-left font-medium text-gray-500 uppercase text-xs tracking-wide px-4 py-2 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400 text-sm">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable
