import React, { useState, useEffect } from "react";
import CustomPopup from "../Common/CustomPopUp";
import CustomSelect from "../../components/Common/CustomSelect";
import { fetchDepartments } from "../../services/formService";
import { InputLabel, Snackbar, Alert } from "@mui/material";
import CustomButton from "../Common/CustomButton";
import { docForward } from "../../services/documentService";

const ForwardPopup = ({ open, setOpen, documentId, fromDepartmentId, forwardedBy }) => {
    const [departmentType, setDepartmentType] = useState("");
    const [toDepartmentId, setToDepartmentId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [alert, setAlert] = useState({ open: false, severity: "success", message: "" });

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
                    setAlert({
                        open: true,
                        severity: "error",
                        message: "शाखाओं को लोड करने में त्रुटि।",
                    });
                }
            }
        };

        getDepartments();
    }, [departmentType]);

    const handleForward = async () => {
        try {
            if (!documentId || !fromDepartmentId || !toDepartmentId || !forwardedBy) {
                setAlert({
                    open: true,
                    severity: "warning",
                    message: "सभी फ़ील्ड आवश्यक हैं।",
                });
                return;
            }

            const response = await docForward(
                documentId,
                fromDepartmentId,
                toDepartmentId,
                forwardedBy,
                remarks
            );

            if (response.success) {
                setAlert({
                    open: true,
                    severity: "success",
                    message: "दस्तावेज़ सफलतापूर्वक आगे बढ़ा।",
                });
                setDepartmentType("");
                setToDepartmentId("");
                setRemarks("");
                setOpen(false); // Close the popup after forwarding
            } else {
                setAlert({
                    open: true,
                    severity: "error",
                    message: `त्रुटि: ${response.message}`,
                });
            }
        } catch (error) {
            console.error("Error forwarding document:", error);
            setAlert({
                open: true,
                severity: "error",
                message: "दस्तावेज़ को आगे बढ़ाने में त्रुटि।",
            });
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setDepartmentType("");
        setToDepartmentId("");
        setRemarks("");
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <>
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
                        value={toDepartmentId}
                        onChange={(e) => setToDepartmentId(e.target.value)}
                        name="toDepartmentId"
                        required
                    />

                    <div>
                        <InputLabel size="15px">टिप्पणी</InputLabel>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Enter Remark"
                            className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md resize-none"
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

            <Snackbar
                open={alert.open}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ForwardPopup;
