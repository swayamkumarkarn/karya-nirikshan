import React from "react";
import { TiPin } from "react-icons/ti";

function DocumentsTable() {
  const documents = [
    {
      sno: 1,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 2,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 3,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 4,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 5,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 6,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 7,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 8,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 9,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 11,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 12,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 13,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 14,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 15,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 16,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 17,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 18,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
    {
      sno: 19,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication",
      status: "Active",
    },
  ];

  return (
    <div className="px-4 py-3">
      <h1 className="text-xl font-bold mb-1">All Documents</h1>

      <div
        className="grid grid-cols-2 gap-4"
        style={{
          gridTemplateColumns: "6fr 3fr", // Adjusting ratio for columns
        }}
      >
        {/* Left section with content */}
        <div>
          {/* Table header row */}
          <div
            className="grid grid-cols-7 gap-4 text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center"
            style={{
              gridTemplateColumns: "1fr 4fr 3fr 4.5fr 3fr 3fr", // Adjusting ratio for columns
            }}
          >
            <div>S.No</div>
            <div>Document No.</div>
            <div>Department</div>
            <div>Date & Time</div>
            <div>Title/Desc</div>
            <div>Status</div>
          </div>

          {/* Data rows in cards */}
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.sno}
                className="relative grid grid-cols-7 gap-4 p-3 text-center justify-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-black"
                style={{
                  gridTemplateColumns: "1fr 4fr 3fr 4.5fr 3fr 3fr", // Adjusting ratio for columns
                }}
              >
                <div>{doc.sno}</div>
                <div className="font-semibold">{doc.documentNo}</div>
                <div>{doc.department}</div>
                <div className="text-seaGreen font-semibold">{doc.date}</div>
                <div>{doc.title}</div>
                <div className="">
                  <span
                    className={`inline-block px-3 py-1 font-bold ${
                      doc.status === "Active"
                        ? " text-yellow-500"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>

                {/* Pin positioned at top-right */}
                <div className="absolute top-1 right-1">
                  <div className="hover:border-2 p-1 rounded">
                    <TiPin className="text-2xl text-yellow-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right section with Action buttons */}
        <div>
          {/* Table header row for Actions */}
          <div className="text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center">
            <div className="">Action</div>
          </div>

          {/* Data rows with buttons */}
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.sno}
                className=" px-1 text-center justify-center items-center "
              >
                {/* Action buttons container */}
                <div className="flex space-x-1 w-full justify-between p-2">
                  <button className="bg-white hover:bg-gray-100 text-black font-semibold gap-4 py-2 px-4 border-2 hover:border-black hover:shadow-md rounded w-full">
                    View
                  </button>
                  <button className="bg-white hover:bg-gray-100 text-black font-semibold gap-4 py-2 px-4 border-2 hover:border-black hover:shadow-md rounded w-full">
                    Edit
                  </button>
                  <button className="bg-white hover:bg-gray-100 text-black font-semibold gap-4 py-2 px-4 border-2 hover:border-black hover:shadow-md rounded  w-full">
                    Print
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentsTable;
