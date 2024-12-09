import React from 'react';

const HomeTable = ({ data, columns }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Grade Documents</h3>
      
  
      <div
        className="grid gap-4 text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center"
        style={{
          gridTemplateColumns: "1fr 3fr 2fr 2fr ",
        }}
      >
        {columns.map((col) => (
          <div className='capitalize' key={col.key}>{col.label}</div>
        ))}
      </div>

      <div className="space-y-4">
        {data.map((row, index) => (
          <div
            key={index} 
            className="grid gap-4 p-3 text-center justify-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-black"
            style={{
              gridTemplateColumns: "1fr 3fr 2fr 2fr ",
            }}
          >
            {columns.map((col) => (
              <div key={col.key} className={col.className || ""}>
                {row[col.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTable;