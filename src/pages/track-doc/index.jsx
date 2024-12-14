import React from "react";
import DocumentDetails from "../../components/TrackDocument/DocumentDetails";

const TrackDoc = () => {
  const documentData = {
    documentNumber: "856",
    applicant: "राकेश सिंह",
    department: "हेड क्लर्क",
    category: "छुट्टी",
    status: "अपूर्ण",
    title: "चिकित्सा संसाधनों के लिए प्रतिपूर्ति अनुरोध।",
  };
  
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
      {/* <DocDetails id={"c96d2f3c-9b72-44ce-af8f-b173a35e7084"}/> */}
      <DocumentDetails {...documentData}/>

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
