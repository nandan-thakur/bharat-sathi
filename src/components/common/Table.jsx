import React from 'react';

const Table = ({ 
  columns, 
  data, 
  onRowClick,
  emptyMessage = 'No data available'
}) => {
  if (!data || data.length === 0) {
    return <div className="table-empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className={column.className || ''}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'clickable-row' : ''}
            >
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.accessor}`} className={column.className || ''}>
                  {column.cell ? column.cell(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
