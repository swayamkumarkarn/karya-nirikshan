import React, { useState } from 'react';
import CustomPopup from '../Common/CustomPopUp';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import { InputLabel } from '@mui/material';
const UpdatePopup = ({ open, setOpen }) => {
    const [karyVivran, setKaryVivran] = useState('');
    const [remark, setRemark] = useState('');

    const handleUpdate = () => {
        console.log("Document Updated");
        console.log("Kary Vivran:", karyVivran);
        console.log("Remark:", remark);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <CustomPopup open={open} setOpen={setOpen} maxWidth="sm">
            <h2 className="text-xl font-bold flex justify-center"> दस्तावेज कार्य अपडेट </h2>

            <div className="mt-4 space-y-4">
                <CustomInput

                    fullWidth
                    value={karyVivran}
                    onChange={(e) => setKaryVivran(e.target.value)}
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
                        className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md resize-none " // Added mt-2 for spacing
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

export default UpdatePopup;
