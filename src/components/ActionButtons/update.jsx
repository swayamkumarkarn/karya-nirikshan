import React, { useState } from 'react';
import CustomPopup from '../Common/CustomPopUp';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import { InputLabel } from '@mui/material';
import { updateLog } from '../../services/documentService'; // Adjust the path as needed

const UpdatePopup = ({ open, setOpen, documentId, handledDepartmentId, handledUserId }) => {
    const [action, setAction] = useState('');
    const [remark, setRemark] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        if (!action) {
            setError("कार्य विवरण (Action) is mandatory.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
           const payload = {
            documentId,
            handledDepartmentId,
            handledUserId,
            action,
            remark
           }
            console.log("payload",payload);
            const response = await updateLog(
                documentId,
                handledDepartmentId,
                handledUserId,
                action,
                remark,
            );
            console.log("Document Updated:", response);
            alert("Document updated successfully!");
            setOpen(false);
        } catch (err) {
            console.error("Error updating document:", err);
            setError(err?.message || "Failed to update document.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <CustomPopup open={open} setOpen={setOpen} maxWidth="sm">
            <h2 className="text-xl font-bold flex justify-center"> दस्तावेज कार्य अपडेट </h2>

            <div className="mt-4 space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <CustomInput
                    fullWidth
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    label="कार्य विवरण"
                    name="DocDetails"
                    placeholder="Enter Document Details"
                    type="text"
                    required
                />
                <div>
                    <InputLabel size="15px">टिप्पणी</InputLabel>
                    <textarea
                        label="टिप्पणी"
                        name="description"
                        placeholder="Enter Remark"
                        className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md resize-none"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
                <CustomButton
                    text="Submit"
                    onClick={handleUpdate}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "अपडेट करें"}
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

export default UpdatePopup;