import React, { useState, useEffect } from "react";
import CustomPopup from "../Common/CustomPopUp";
import CustomSelect from "../../components/Common/CustomSelect";
// import CustomInput from "../components/Common/CustomInput";
import { fetchDepartments } from "../../services/formService";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import CustomButton from "../Common/CustomButton";

const ForwardPopup = ({ open, setOpen }) => {
    const [departmentType, setDepartmentType] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [departmentOptions, setDepartmentOptions] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            if (departmentType) {
                try {
                    const data = await fetchDepartments(departmentType);
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
    }, [departmentType]);

    const handleForward = () => {
        console.log("Document forwarded to", departmentName);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <CustomPopup open={open} setOpen={setOpen} maxWidth="sm">
            <h2 className="text-xl font-bold flex justify-center">दस्तावेज़ को आगे बढ़ाएं</h2>
          

            <div className="grid grid-cols-1 gap-4">
                <CustomSelect
                    label="शाखा वर्ग"
                    options={[
                        { value: "internal", label: "कार्यालय अंतर्गत" },
                        { value: "external", label: "कार्यालय बाह्य" },
                    ]}
                    value={departmentType}
                    onChange={(e) => setDepartmentType(e.target.value)}
                    name="departmentType"
                    required
                />
                <CustomSelect
                    label="शाखा का नाम"
                    options={departmentOptions}
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    name="departmentName"
                    required
                />

                <div>
                    <InputLabel size="15px">टिप्पणी</InputLabel>
                    <textarea
                        label="टिप्पणी"
                        name="description"
                        
                        placeholder="Enter Remark"
                        className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md resize-none " // Added mt-2 for spacing
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
                           
                           <CustomButton
                               text="Submit"
                               onClick={handleForward}
                               variant="contained"
                               color="primary"
                               size="small"
                           >
                               अपडेट करें
                           </CustomButton>
                           <CustomButton
                               text="Cancel"
                                  onClick={handleCancel} 
                               variant="contained"
                               color="primary"
                               size="small"
                           >
                               अस्वीकारें
                           </CustomButton>
                       </div>
        </CustomPopup>
    );
};

export default ForwardPopup;
