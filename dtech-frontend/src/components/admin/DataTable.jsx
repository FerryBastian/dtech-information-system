const DataTable = ({ columns, data, loading, emptyText = 'Belum ada data' }) => {
  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!data?.length) return (
    <div className="text-center py-16 text-gray-500 text-sm">{emptyText}</div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a3348]">
            {columns.map(col => (
              <th key={col.key} className={`text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4 ${col.className || ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} className="border-b border-[#2a3348]/50 hover:bg-[#1e2535]/50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className={`py-3 px-4 text-gray-300 ${col.className || ''}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DataTable;
