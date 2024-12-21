import React from 'react';
import CustomPopup from '../Common/CustomPopUp';
import { Button } from '@mui/material';
import CustomButton from '../Common/CustomButton';
import { InputLabel } from '@mui/material';

const AcceptAction = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        // Logic when the action is accepted
        console.log("Action Accepted!");
        setOpen(false); // Close the popup after accepting
    };

    const handleCancel = () => {
        // Logic when the action is canceled
        console.log("Action Canceled");
        setOpen(false); // Close the popup after canceling
    };

    return (
        <CustomPopup open={open} setOpen={setOpen} maxWidth='sm'>
            {/* Popup Content */}
            
                <h2 className="text-xl font-bold mb-4 flex justify-center">दस्तावेज़ का कार्य पूरा हो चुका है?</h2>
                <div className="mt-4 space-y-4">
                    <div >
                        <InputLabel size="15px">टिप्पणी</InputLabel>
                        <textarea
                            label="टिप्पणी"
                            name="description"
                        
                            placeholder="Enter Remark"
                            className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md resize-none " // Added mt-2 for spacing
                        />
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-4 flex justify-center gap-4">
                    <CustomButton
                        text="Submit"
                        onClick={handleAccept}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        स्वीकारें
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

export default AcceptAction;
