import React, { useState, useEffect } from "react";
import CustomTable from "../Common/CustomTable/index";
import CustomPopup from "../Common/CustomPopUp";
import { fetchDocumentList } from "../../services/NotificationService";
import { useSelector } from "react-redux";

const App = ({ open, setOpen }) => {
  const tableHeadData = ["दस्तावेज क्रमांक", "शीर्षक", "शाखा", "दिनांक", "प्रतिक्रिया"];
  const gridTemplate = "1fr 1fr 1fr 1fr 1fr";

  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const departmentId = useSelector((state) => state?.auth?.user?.data?.department_id);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchDocumentList(departmentId);
      if (!data?.success) {
        throw new Error("Failed to fetch valid data");
      }

      const formattedData = data.data.map((item) => ({
        id: item.id,
        documentNumber: item.document_number,
        documentTitle: item.document_title,
        department: item.from_department_hindi_name,
        forwardDate: new Date(item.forward_date).toLocaleDateString("hi-IN"),
        remarks: item.remarks || "N/A",
      }));

      setTableRows(formattedData);
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

  return (
    <div style={{ padding: "20px" }}>
      <CustomPopup open={open} setOpen={setOpen} maxWidth="lg">
        <CustomTable
          title="आवक दस्तावेज"
          rows={tableRows}
          headData={tableHeadData}
          gridWidth={gridTemplate}
          loading={loading}
          refetchData={fetchData} // Pass the refetch function as a prop
        />
      </CustomPopup>
    </div>
  );
};

export default App;
