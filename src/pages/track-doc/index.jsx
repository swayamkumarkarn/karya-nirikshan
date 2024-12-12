import React from "react";

const TrackDoc = () => {
  const documents = [
    {
      date: "26-11-24",
      time: " 04:00PM",
      department: "मेडिकल",
      event: "आइटम प्राप्त",
      remark: "",
    },
    {
      date: "20-11-24",
      time: " 12:08PM",
      department: "वित्त",
      event: "आइटम बैग किया गया",
      remark: "",
    },
    {
      date: "15-11-24",
      time: " 02:20PM",
      department: "हेड क्लर्क",
      event: "आइटम बैग किया गया",
      remark: "",
    },
    {
      date: "06-11-24",
      time: " 11:50AM",
      department: "डिस्पैच",
      event: "आइटम बनाया गया",
      remark: "",
    },
  ];
  return (
    <>
      <div className="px-4 py-3">
        <h1 className="text-xl font-bold mb-1">दस्तावेज़ विवरण</h1>

        <div className="border rounded-lg shadow-md p-4 bg-white max-w-lg">
          <div className="grid grid-cols-2 py-1 gap-y-1  text-sm text-gray-400 items-start" style={{
            gridTemplateColumns: "4fr 8fr", // Adjusting ratio for columns
          }}>
            {/* Row 1 */}
            <span className="font-semibold">दस्तावेज़ संख्या:</span>
            <span className="font-semibold text-black">856</span>

            {/* Row 2 */}
            <span className="font-semibold">आवेदक:</span>
            <span className="font-semibold text-black">राकेश सिंह</span>

            {/* Row 3 */}
            <span className="font-semibold">विभाग:</span>
            <span className="font-semibold text-black">हेड क्लर्क</span>

            {/* Row 4 */}
            <span className="font-semibold">श्रेणी:</span>
            <span className="font-semibold text-seaGreen">छुट्टी</span>

            {/* Row 5 */}
            <span className="font-semibold">स्थिति:</span>
            <span className="text-yellow-500 font-semibold">अपूर्ण</span>

            {/* Row 6 (Full width) */}
            <span className="font-semibold">शीर्षक:</span>
            <span className="font-bold text-black">
              चिकित्सा संसाधनों के लिए प्रतिपूर्ति अनुरोध।
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <h1 className="text-xl font-bold mb-1">इवेंट विवरण</h1>

        <div
          className="grid grid-cols-2 gap-4"
          style={{
            gridTemplateColumns: "6fr 3fr", // Adjusting ratio for columns
          }}
        >
          <div>
            {/* Table header row */}
            <div
              className="grid grid-cols-5 gap-4 text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center"
              style={{
                gridTemplateColumns: "2fr 2fr 4fr 3fr 6fr", // Adjusting ratio for columns
              }}
            >
              <div>तारीख</div>
              <div>समय</div>
              <div>विभाग</div>
              <div>इवेंट</div>
              <div>टिप्पणी</div>
            </div>

            {/* Data rows in cards */}
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.date}
                  className=" grid grid-cols-5 gap-4 p-3 text-center justify-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-black"
                  style={{
                    gridTemplateColumns: "2fr 2fr 4fr 3fr 6fr", // Adjusting ratio for columns
                  }}
                >
                  <div className="font-semibold text-gray-400">{doc.date}</div>
                  <div className="font-semibold">{doc.time}</div>
                  <div>{doc.department}</div>
                  <div className="text-seaGreen font-semibold">{doc.event}</div>
                  <div>{doc.remark}</div>
                </div>
              ))}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export const meta = {
  title: "दस्तावेज़ ट्रैक करें",
  description: "दस्तावेज़ ट्रैकिंग",
};

export default TrackDoc;
