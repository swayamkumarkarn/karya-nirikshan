import React from 'react';
import CustomPopup from '../Common/CustomPopUp';
import CustomButton from '../Common/CustomButton';
import { InputLabel } from '@mui/material';

const AcceptAction = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
    
        console.log("Action Accepted!");
        setOpen(false); 
    };

    const handleCancel = () => {
        
        console.log("Action Canceled");
        setOpen(false);
    };

    return (
        <CustomPopup open={open} setOpen={setOpen} maxWidth='sm'>
                <h2 className="text-xl font-bold mb-4 flex justify-center">क्या कार्य आपके शाखा द्वारा पूर्ण किया गया है?</h2>
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
