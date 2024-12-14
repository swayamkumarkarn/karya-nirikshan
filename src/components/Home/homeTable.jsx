import React from 'react';

const HomeTable = ({ data, columns }) => {
  // Function to determine the color based on the grade
  const getGradeColor = (grade) => {
    if (grade === "ग्रेड A") return "bg-red-100 text-red-800";
    if (grade === "ग्रेड B") return "bg-yellow-100 text-yellow-800";
    if (grade === "ग्रेड C") return "bg-green-100 text-green-800";
    return "";
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">ग्रेड दस्तावेज़</h3>

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

      <div className="space-y-4 font">
        {data.map((row, index) => (
          <div
            key={index} 
            className="grid gap-4 p-3 text-center justify-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-b-2 border-r-4 border-gray-200"
            style={{
              gridTemplateColumns: "1fr 3fr 2fr 2fr ",
            }}
          >
            {columns.map((col) => (
              <div key={col.key} className={col.className || ""}>
                {/* Applying color based on grade */}
                {col.key === "grade" ? (
                  <div className={`p-2 rounded font-bold ${getGradeColor(row[col.key])}`}>
                    {row[col.key]}
                  </div>
                ) : (
                  row[col.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTable;
