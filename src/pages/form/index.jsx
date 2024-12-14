import React, { useState, useEffect } from "react";
import CustomSelect from '../../components/Common/CustomSelect';
import CustomInput from '../../components/Common/CustomInput';
import { fetchReportTypes, fetchDepartments, createDocument } from '../../services/formService';
import { useSelector } from "react-redux";
import navigateToPage from "../../lib/functionality/navigation";
import { Alert, Snackbar, InputLabel } from '@mui/material';

const Form = () => {
  const [formData, setFormData] = useState({
    registerId: "",
    unitNumber: "",
    departmentType: "",
    departmentName: "",
    referenceNumber: "",
    subject: "",
    lastOccurrenceGrade: "",
    priority: "",
    description: "",
  });

  const [registerIdOptions, setRegisterIdOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

  const userData = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const getRegisterTypes = async () => {
      try {
        const data = await fetchReportTypes();
        const options = data.map(item => ({
          value: item.id,
          label: item.name,
        }));
        setRegisterIdOptions(options);
      } catch (error) {
        console.error("Failed to fetch report types:", error);
      }
    };

    getRegisterTypes();
  }, []);

  useEffect(() => {
    const getDepartments = async () => {
      if (formData.departmentType) {
        try {
          const data = await fetchDepartments(formData.departmentType);
          const options = data.map(item => ({
            value: item.id,
            label: item.hindi_name,
          }));
          setDepartmentOptions(options);
        } catch (error) {
          console.error("Failed to fetch departments:", error);
        }
      }
    };

    getDepartments();
  }, [formData.departmentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAlertClose = () => {
    setAlert({ open: false, severity: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdBy = userData?.data.id;
    const currentDeprtmentId = userData?.data.department_id;

    const requestBody = {
      createdBy,
      registerId: formData.registerId,
      dispatchDocNumber: formData.unitNumber,
      departmentId: formData.departmentName,
      title: formData.subject,
      description: formData.description,
      priority: formData.priority,
      grade: formData.lastOccurrenceGrade,
      currentDeprtmentId,
      tags: [],
    };

    try {
      const response = await createDocument(requestBody);
      console.log("res", response);

      // Show success alert
      setAlert({
        open: true,
        severity: "success",
        message: "पंजीयन सफलता पूर्वक हो गया है।",
      });

      // Reset form fields and navigate to another page
      setFormData({
        registerId: "",
        unitNumber: "",
        departmentType: "",
        departmentName: "",
        referenceNumber: "",
        subject: "",
        lastOccurrenceGrade: "",
        priority: "",
        description: "",
      });
      navigateToPage("/documents");
    } catch (error) {
      console.error("Failed to submit form:", error.message);

      // Show error alert
      setAlert({
        open: true,
        severity: "error",
        message: "पंजीयन करने में त्रुटि हुई है। कृपया पुनः प्रयास करें।",
      });
    }
  };

  const departmentTypeOptions = [
    { value: "internal", label: "कार्यालय अंतर्गत मामले" },
    { value: "external", label: "कार्यालय बाह्य मामले" },
  ];

  const gradeOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "mid", label: "Mid" },
    { value: "high", label: "High" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex h-full w-full justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md h-[70%] w-[60%] fixed"
      >
        <h2 className="text-xl font-bold mb-4 justify-center flex">
          दस्तावेज़ पंजीयन (Document Registration)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CustomSelect
              label="रजिस्टर प्रकार"
              options={registerIdOptions}
              value={formData.registerId}
              onChange={handleChange}
              name="registerId"
              required
            />
          </div>

          <div>
            <CustomInput
              label="दर्ज संख्या"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              placeholder="Enter Unit Number"
              type="text"
              required
            />
          </div>

          <div>
            <CustomSelect
              label="विभाग वर्ग"
              options={departmentTypeOptions}
              value={formData.departmentType}
              onChange={handleChange}
              name="departmentType"
              required
            />
          </div>

          <div>
            <CustomSelect
              label="विभाग का नाम"
              options={departmentOptions}
              value={formData.departmentName}
              onChange={handleChange}
              name="departmentName"
              required
            />
          </div>

          <div>
            <CustomInput
              label="पत्र शीर्षक"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Subject"
              type="text"
              required
            />
          </div>

          <div>
            <InputLabel size="15px">विवरण</InputLabel>
            <textarea
              label="विवरण"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <CustomSelect
              label="ग्रेड"
              options={gradeOptions}
              value={formData.lastOccurrenceGrade}
              onChange={handleChange}
              name="lastOccurrenceGrade"
              required
            />
          </div>

          <div>
            <CustomSelect
              label="प्राथमिकता"
              options={priorityOptions}
              value={formData.priority}
              onChange={handleChange}
              name="priority"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md shadow-md hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* MUI Snackbar for Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
