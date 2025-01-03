import React, { useEffect, useState } from "react";
import { TiPin } from "react-icons/ti";
import CustomButton from "../../components/Common/CustomButton";
import { getAllDocument } from "../../services/documentService";
import navigateToPage from "../../lib/functionality/navigation";
import { useSelector } from "react-redux";
import { fetchDocumentList } from "../../services/NotificationService";
import { submitAction } from "../../services/NotificationService";
import { useRefresh } from "../../contexts/RefreshContext";
import {

  Snackbar,
  Alert,
} from "@mui/material";
// import { useSelector } from "react-redux";

function DocumentsTable() {
  const [alertData, setAlertData] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const departmentId = useSelector((state) => state?.auth?.user?.data?.department_id);
  const userId = useSelector((state) => state?.auth?.user?.data?.id);

  const [tableData, setTableData] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const userData = useSelector((state) => state?.auth?.user?.data);
  const { triggerRefresh } = useRefresh();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getAllDocument(userData.department_id);
        setDocuments(response.data || []);
      } catch (err) {
        console.error("Failed to fetch documents:", err.message);
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("departmentId", departmentId);
      const data = await fetchDocumentList(departmentId);
      if (!data?.success) {
        throw new Error("Failed to fetch valid data");
      }
      console.log("data ", data);

      const formattedData = data.data.map((item) => ({
        id: item.id,
        document_number: item.document_number,
        title: item.document_title,
        department_hindi_name: item.from_department_hindi_name,
        created_at: item.forward_date,
        status: item.status,
        document_id: item.document_id
      }));

      setTableData(formattedData);
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentId) {
      fetchData();
    }
  }, [departmentId]);

  const handleAction = async (rowIndex, actionType, rowId) => {
    if (!userId) {
      setAlertData({
        open: true,
        message: "उपयोगकर्ता आईडी गायब है!",
        severity: "error",
      });
      return;
    }

    try {
      await submitAction(rowId, userId, actionType);
      console.log(`सफलतापूर्वक ${actionType === "accepted" ? "स्वीकृत" : "अस्वीकृत"} किया गया।`);

      setAlertData({
        open: true,
        message: `सफलतापूर्वक ${actionType === "accepted" ? "स्वीकृत" : "अस्वीकृत"} किया गया।`,
        severity: "success",
      });
      triggerRefresh();

      fetchData();
      // triggerRefresh(); // Refetch the data after a successful action
    } catch (error) {
      console.error(`Error during ${actionType.toLowerCase()} action:`, error);
      setAlertData({
        open: true,
        message: `कृपया पुनः प्रयास करें। ${actionType === "accepted" ? "स्वीकृत" : "अस्वीकृत"} करने में विफल।`,
        severity: "error",
      });
      console.log(`कृपया पुनः प्रयास करें। ${actionType === "accepted" ? "स्वीकृत" : "अस्वीकृत"} करने में विफल।`);
    }
  };

  const handleCloseSnackbar = () => {
    setAlertData({ ...alertData, open: false });
  };


  const shimmerRows = Array.from({ length: 20 }, (_, i) => i); // Placeholder for shimmer effect

  return (
    <div>

      <div className="px-4 py-3">
        {tableData.length > 0 && (
          <>
            <h1 className="text-xl font-bold mb-1">आवक दस्तावेज</h1>
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
                  <div>शाखा</div>
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
          </>
        )}

        {loading
          ? shimmerRows.map((_, index) => (
            <div
              className="grid grid-cols-2 gap-4 mb-2 animate-pulse"
              key={index}
              style={{ gridTemplateColumns: "7fr 3fr" }}
            >
              {/* Shimmer Table Row */}
              <div
                className="relative grid grid-cols-7 gap-4 p-4 text-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200"
                style={{ gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr" }}
              >
                <div className="bg-gray-300 h-5 w-6 rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-6 w-16 rounded"></div>
                <div className="absolute top-1 right-1 bg-gray-300 h-6 w-6 rounded-full"></div>
              </div>

              {/* Shimmer Action Buttons */}
              <div className="flex justify-evenly items-center gap-2">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ))
          : tableData.map((doc, index) => (
            <div
              className="grid grid-cols-2 gap-4 mb-2"
              key={doc.id}
              style={{ gridTemplateColumns: "7fr 3fr" }}
            >
              {/* Table Row */}
              <div
                className="relative grid grid-cols-7 gap-4 p-3 text-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200"
                style={{ gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr" }}
              >
                <div>{index + 1}</div>
                <div className="font-semibold">{doc.document_number}</div>
                <div>{doc.department_hindi_name}</div>
                <div className="text-seaGreen font-semibold">
                  {new Date(doc.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
                <div>{doc.title}</div>
                <div className="">
                  <span
                    className={`inline-block px-4 py-1 font-bold ${doc.status === "created"
                        ? "bg-yellow-100 rounded-lg text-yel"
                        : doc.status === "pending"
                          ? "bg-orange-100 rounded-lg text-orange-500"
                          : doc.status === "completed"
                            ? "bg-green-100 rounded-lg text-green-700"
                            : "bg-red-100 rounded-lg text-red-800"
                      }`}
                  >
                    {doc.status === "created"
                      ? "निर्मित"
                      : doc.status === "pending"
                        ? "प्रतीक्षित"
                        : doc.status === "completed"
                          ? "पूर्ण"
                          : "निष्क्रिय"}
                  </span>
                </div>
                {/* Pin */}
                <div className="absolute top-1 right-1">
                  <div className="hover:border-2 hover:border-black hover:bg-white rounded text-gray-400 hover:text-yellow-400">
                    <TiPin className="text-2xl" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-evenly items-center gap-2">
                <CustomButton
                  text={"देखें"}
                  variant="contained"
                  onClick={() => {
                    navigateToPage(`/track-doc/${doc.document_id}`);
                  }}
                  fullWidth
                  color="white"
                  sx={{
                    textTransform: "none",
                    border: "1px solid #B6BFC8",
                    "&:hover": { border: "1px solid black" },
                  }}
                />

                <CustomButton
                  text={"Accept"}
                  variant="contained"
                  fullWidth
                  color="white"
                  onClick={() => handleAction(index, "accepted", doc.id)}
                  sx={{
                    textTransform: "none",
                    border: "1px solid #B6BFC8",
                    "&:hover": { border: "1px solid black" },
                  }}
                />
                <CustomButton
                  text={"Decline"}
                  variant="contained"
                  fullWidth
                  color="white"
                  onClick={() => handleAction(index, "declined", doc.id)}
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




      <div className="px-4 py-3">

        <h1 className="text-xl font-bold mb-1">मेरे दस्तावेज़</h1>

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
              <div>शाखा</div>
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
        {loading
          ? shimmerRows.map((_, index) => (
            <div
              className="grid grid-cols-2 gap-4 mb-2 animate-pulse"
              key={index}
              style={{ gridTemplateColumns: "7fr 3fr" }}
            >
              {/* Shimmer Table Row */}
              <div
                className="relative grid grid-cols-7 gap-4 p-4 text-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200"
                style={{ gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr" }}
              >
                <div className="bg-gray-300 h-5 w-6 rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-5 w-full rounded"></div>
                <div className="bg-gray-300 h-6 w-16 rounded"></div>
                <div className="absolute top-1 right-1 bg-gray-300 h-6 w-6 rounded-full"></div>
              </div>

              {/* Shimmer Action Buttons */}
              <div className="flex justify-evenly items-center gap-2">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
            </div>
          ))
          : documents.map((doc, index) => (
            <div
              className="grid grid-cols-2 gap-4 mb-2"
              key={doc.id}
              style={{ gridTemplateColumns: "7fr 3fr" }}
            >
              {/* Table Row */}
              <div
                className="relative grid grid-cols-7 gap-4 p-3 text-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200"
                style={{ gridTemplateColumns: "1fr 4fr 3fr 4.5fr 5fr 2.5fr" }}
              >
                <div>{index + 1}</div>
                <div className="font-semibold">{doc.document_number}</div>
                <div>{doc.department_hindi_name}</div>
                <div className="text-seaGreen font-semibold">
                  {new Date(doc.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
                <div>{doc.title}</div>
                <div className="">
                  <span
                    className={`inline-block px-4 py-1 font-bold ${doc.status === "created"
                      ? "bg-yellow-100 rounded-lg text-yel"
                      : doc.status === "pending"
                        ? "bg-orange-100 rounded-lg text-orange-500"
                        : doc.status === "completed"
                          ? "bg-green-100 rounded-lg text-green-700"
                          : "bg-red-100 rounded-lg text-red-800"
                      }`}
                  >
                    {doc.status === "created"
                      ? "निर्मित"
                      : doc.status === "pending"
                        ? "प्रतीक्षित"
                        : doc.status === "completed"
                          ? "पूर्ण"
                          : "निष्क्रिय"}
                  </span>
                </div>
                {/* Pin */}
                <div className="absolute top-1 right-1">
                  <div className="hover:border-2 hover:border-black hover:bg-white rounded text-gray-400 hover:text-yellow-400">
                    <TiPin className="text-2xl" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-evenly items-center gap-2">
                <CustomButton
                  text={"देखें"}
                  variant="contained"
                  onClick={() => {
                    navigateToPage(`/track-doc/${doc.id}`);
                  }}
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
      <Snackbar
        open={alertData.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertData.severity}
          sx={{ width: "100%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export const meta = {
  title: "सभी दस्तावेज़",
  description: "सभी दस्तावेज़",
};

export default DocumentsTable;
