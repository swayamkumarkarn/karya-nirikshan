import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/Common/CustomSelect";
import CustomInput from "../../components/Common/CustomInput";
import {
  fetchReportTypes,
  fetchDepartments,
  createDocument,
  fetchCategoryList,
} from "../../services/formService";
import { useDispatch, useSelector } from "react-redux";
import navigateToPage from "../../lib/functionality/navigation";
import { setAlert } from "../../redux/actions/alert";

const Form = () => {
  const [formData, setFormData] = useState({
    registerId: "",
    unitNumber: "",
    departmentType: "",
    departmentName: "",
    complaintType: "",
    // referenceNumber: "",
    title: "",
    grade: "",
    priority: "",
    description: "",
  });

  const [registerIdOptions, setRegisterIdOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [complaintTypeOptions, setComplaintTypeOptions] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const getRegisterTypes = async () => {
      try {
        const data = await fetchReportTypes();
        const options = data.map((item) => ({
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
          const options = data.map((item) => ({
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

  const handleChange = async (e) => {
    const { name, value } = e.target;


    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle dynamic fetching of complaint types for "शिकायत शाखा"
    if (name === "departmentName") {
      const selectedDepartment = departmentOptions.find(
        (option) => option.value === value
      );

      // If the selected department is "शिकायत शाखा", fetch complaint types
      if (selectedDepartment && selectedDepartment.label === "शिकायत शाखा") {
        console.log("object", value);
        try {
          const categoryList = await fetchCategoryList(value); // Pass department ID
          const options = categoryList.map((item) => ({
            value: item.id,
            label: item.hindi_name || item.name,
          }));
          setComplaintTypeOptions(options);
        } catch (error) {
          console.error("Failed to fetch complaint types:", error.message);
        }
      } else {
        // Clear complaint type options if not "शिकायत शाखा"
        setComplaintTypeOptions([]);
        setFormData((prevData) => ({ ...prevData, complaintType: "" }));
      }
    }
  };
  // console.log("departmentOptions",departmentOptions);
  // console.log("complaintTypeOptions",complaintTypeOptions);

  console.log("formdata", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdBy = userData?.data.id;
    const currentDeprtmentId = userData?.data.department_id;

    const requestBody = {
      createdBy,
      category_id: formData.complaintType,
      registerId: formData.registerId,
      dispatchDocNumber: formData.unitNumber,
      departmentId: formData.departmentName,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      grade: formData.grade,
      currentDeprtmentId,
      tags: [],
    };
    console.log("complaintTypeOptions", requestBody);

    try {
      const response = await createDocument(requestBody);
      console.log("Response:", response);

      alert(`पंजीयन सफलता पूर्वक हो गया है। दस्तावेज़ संख्या: ${response.data.document_number}`);
      dispatch(setAlert("success", "पंजीयन सफलता पूर्वक हो गया है।"));

      setFormData({
        registerId: "",
        unitNumber: "",
        departmentType: "",
        departmentName: "",
        // referenceNumber: "",
        title: "",
        grade: "",
        priority: "",
        description: "",
      });

      navigateToPage("/documents");
    } catch (error) {
      console.error("Failed to submit form:", error.message);
      dispatch(setAlert("error", "पंजीयन करने में त्रुटि हुई है। कृपया पुनः प्रयास करें।"));
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
    <div className="bg-gray-100 min-h-screen flex  w-full justify-center">
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-lg   w-[60%] fixed"
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
              label="आवक-जावक संख्या"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              placeholder="Enter Dispatch Number"
              type="text"
              required
            />
          </div>

          <div>
            <CustomSelect
              label="शाखा वर्ग"
              options={departmentTypeOptions}
              value={formData.departmentType}
              onChange={handleChange}
              name="departmentType"
              required
            />
          </div>

          <div>
            <CustomSelect
              label="शाखा का नाम"
              options={departmentOptions}
              value={formData.departmentName}
              onChange={handleChange}
              name="departmentName"
              required
            />
          </div>

          {/* Render "शिकायत के प्रकार" dropdown dynamically */}
          {complaintTypeOptions.length > 0 && (
            <div>
              <CustomSelect
                label="शिकायत के प्रकार"
                options={complaintTypeOptions}
                value={formData.complaintType}
                onChange={handleChange}
                name="complaintType"
                required
              />
            </div>
          )}

          <div>
            <CustomInput
              label="पत्र शीर्षक"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              type="text"
              required
            />
          </div>
          <div>
            <label>विवरण</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-[100%] h-20 p-2 border-2 bg-gray rounded-md resize-none"
              required
            />
          </div>
          <div className="md:grid-cols-1 gap-4">
            {complaintTypeOptions.length > 0 && (
              <div className="mb-3">
                <CustomSelect
                  label="ग्रेड"
                  options={gradeOptions}
                  value={formData.grade}
                  onChange={handleChange}
                  name="grade"
                  required
                />
              </div>
            )}
            {complaintTypeOptions.length > 0 && (
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
            )}
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
    </div>
  );
};

export default Form;
