import React from "react";

const DocumentDetails = ({
  documentNumber,
  applicant,
  department,
  category,
  status,
  title,
}) => {
  return (
    <div className="px-4 py-3">
      <h1 className="text-xl font-bold mb-1">दस्तावेज़ विवरण</h1>

      <div className="border rounded-lg shadow-md p-4 bg-white max-w-lg">
        <div
          className="grid grid-cols-2 py-1 gap-y-1 text-sm text-gray-400 items-start"
          style={{
            gridTemplateColumns: "4fr 8fr", // Adjusting ratio for columns
          }}
        >
          {/* Row 1 */}
          <span className="font-semibold">दस्तावेज़ संख्या:</span>
          <span className="font-semibold text-black">{documentNumber}</span>

          {/* Row 2 */}
          <span className="font-semibold">आवेदक:</span>
          <span className="font-semibold text-black">{applicant}</span>

          {/* Row 3 */}
          <span className="font-semibold">विभाग:</span>
          <span className="font-semibold text-black">{department}</span>

          {/* Row 4 */}
          <span className="font-semibold">श्रेणी:</span>
          <span className="font-semibold text-seaGreen">{category}</span>

          {/* Row 5 */}
          <span className="font-semibold">स्थिति:</span>
          <span
            className={`font-semibold ${
              status === "अपूर्ण"
                ? "text-yellow-500"
                : status === "पूर्ण"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {status}
          </span>

          {/* Row 6 (Full width) */}
          <span className="font-semibold">शीर्षक:</span>
          <span className="font-bold text-black">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
