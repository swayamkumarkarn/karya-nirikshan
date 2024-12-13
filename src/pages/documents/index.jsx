import React from "react";
import { TiPin } from "react-icons/ti";
import CustomButton from "../../components/Common/CustomButton";

function DocumentsTable() {
  const documents = [
    {
      sno: 1,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
    {
      sno: 2,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
    {
      sno: 3,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "notactive",
    },
    {
      sno: 4,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "notactive",
    },
    {
      sno: 5,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
    {
      sno: 6,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई दवाई दवाई दवाई दवाई दवाई",
      status: "active",
    },
    {
      sno: 7,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
    {
      sno: 8,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
    {
      sno: 9,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
    {
      sno: 10,
      documentNo: "123/321/IN",
      department: "मेडिकल",
      date: "23-11-24 04:00pm",
      title: "दवाई",
      status: "active",
    },
  ];

  return (
    <div className="px-4 py-3">
      <h1 className="text-xl font-bold mb-1">सभी दस्तावेज़</h1>

      <div
        className="grid grid-cols-2 gap-4"
        style={{ gridTemplateColumns: "7fr 3fr" }}
      >
        {/* Table Header */}
        <div>
          <div
            className="grid grid-cols-7 gap-4 text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center"
            style={{ gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr" }}
          >
            <div>क्रमांक</div>
            <div>दस्तावेज़ संख्या</div>
            <div>विभाग</div>
            <div>तिथि और समय</div>
            <div>शीर्षक/विवरण</div>
            <div>स्थिति</div>
          </div>
        </div>

        {/* Action Header */}
        <div className="text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center">
          <div>क्रिया</div>
        </div>
      </div>

      {/* Combined Rows */}
      {documents.map((doc) => (
        <div
          className="grid grid-cols-2 gap-4 mb-2"
          key={doc.sno}
          style={{ gridTemplateColumns: "7fr 3fr" }}
        >
          {/* Table Row */}
          <div
            className="relative grid grid-cols-7 gap-4 p-3 text-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-black"
            style={{ gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr" }}
          >
            <div>{doc.sno}</div>
            <div className="font-semibold">{doc.documentNo}</div>
            <div>{doc.department}</div>
            <div className="text-seaGreen font-semibold">{doc.date}</div>
            <div>{doc.title}</div>
            <div className="">
              <span
                className={`inline-block px-4 py-1 font-bold ${
                  doc.status === "active"
                    ? "  rounded-lg text-yellow-500"
                    : "bg-red-100 rounded-lg text-red-800"
                }`}
              >
                {doc.status === "active" ? "सक्रिय" : "निष्क्रिय"}
              </span>
            </div>
            {/* Pin */}
            <div className="absolute top-1 right-1">
              <div className="hover:border-2 hover:border-black hover:bg-white  rounded text-gray-400 hover:text-yellow-400">
                <TiPin className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-evenly items-center gap-2">
            <CustomButton
              text={"देखें"}
              variant="contained"
              fullWidth
              color="white"
              sx={{
                textTransform: "none",
                border: "1px solid #B6BFC8",
                "&:hover": { border: "1px solid black" },
              }}
            />
            <CustomButton
              text={"संपादित करें"}
              variant="contained"
              fullWidth
              color="white"
              sx={{
                textTransform: "none",
                border: "1px solid #B6BFC8",
                "&:hover": { border: "1px solid black" },
              }}
            />
            <CustomButton
              text={"प्रिंट करें"}
              variant="contained"
              fullWidth
              color="white"
              sx={{
                textTransform: "none",
                border: "1px solid #B6BFC8",
                "&:hover": { border: "1px solid black" },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const meta = {
  title: "सभी दस्तावेज़",
  description: "सभी दस्तावेज़",
};

export default DocumentsTable;
