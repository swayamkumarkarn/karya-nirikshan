import React from "react";
import { TiPin } from "react-icons/ti";
import CustomButton from "../../components/Common/CustomButton";

function DocumentsTable() {
  const documents = [
    {
      sno: 1,
      documentNo: "123/321/IN",
      department: "Medical",
      date: "23-11-24 04:00pm",
      title: "Medication ",
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
          gridTemplateColumns: "7fr 3fr", // Adjusting ratio for columns
        }}
      >
        {/* Left section with content */}
        <div>
          {/* Table header row */}
          <div
            className="grid grid-cols-7 gap-4 text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center"
            style={{
              gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr", // Adjusting ratio for columns
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
                className="relative grid grid-cols-7 gap-4 p-3 text-center justify-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-black"
                style={{
                  gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr", // Adjusting ratio for columns
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
                  <div className="hover:border-2 p-1 rounded text-gray-400 hover:text-yellow-400">
                    <TiPin className="text-2xl " />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right section with Action buttons */}
        <div className="">
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
                  <CustomButton
                    text={"View"}
                    variant="contained"
                    fullWidth
                    color="white"
                    sx={{
                      textTransform: "none", // Prevent capitalization
                      border: "1px solid #B6BFC8",
                      "&:hover": {
                        border: "1px solid black", // Black border on hover
                      },
                    }}
                  />
                  <CustomButton
                    text={"Edit"}
                    variant="contained"
                    fullWidth
                    color="white"
                    sx={{
                      textTransform: "none", // Prevent capitalization
                      border: "1px solid #B6BFC8",
                      "&:hover": {
                        border: "1px solid black", // Black border on hover
                      },
                    }}
                  />
                  <CustomButton
                    text={"Print"}
                    variant="contained"
                    fullWidth
                    color="white"
                    sx={{
                      textTransform: "none", // Prevent capitalization
                      border: "1px solid #B6BFC8", // Transparent border by default
                      "&:hover": {
                        border: "1px solid black", // Black border on hover
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const meta = {
  title: "All Documents",
  description: "All Documents",
};

export default DocumentsTable;
