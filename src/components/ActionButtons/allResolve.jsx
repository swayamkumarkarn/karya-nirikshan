import React, { useState } from 'react';
import CustomPopup from '../Common/CustomPopUp';
import { Snackbar, Alert, InputLabel } from '@mui/material';
import CustomButton from '../Common/CustomButton';
import { docDispose } from '../../services/documentService';
import {setAlert,clearAlert} from "../../redux/actions/alert";
import { useSelector, useDispatch } from "react-redux";

const AllResolve = ({ open, setOpen, documentId, userId }) => {
    const [remark, setRemark] = useState('');
    const dispatch = useDispatch();

    const handleAccept = async () => {
        try {
            if (!documentId || !userId) {
               
                dispatch(setAlert("warning", "दस्तावेज़ आईडी और उपयोगकर्ता आईडी अनिवार्य है।"));
                return;
            }

            await docDispose(documentId, userId, remark);
            
            dispatch(setAlert("success", "दस्तावेज़ निराकरण पूर्ण हुआ।"));
            setOpen(false); // Close the popup after accepting
        } catch (error) {
            console.error('Error disposing document:', error);
            
            dispatch(setAlert("error", "दस्तावेज़ के निराकरण में त्रुटि हुई।"));

        }
    };

    const handleCancel = () => {
       
        dispatch(setAlert("warning", " कार्य पूर्ण नहीं किया गया हैं।"));
        setOpen(false); // Close the popup after canceling
        setRemark('');
    };


    return (
        <>
            <CustomPopup open={open} setOpen={setOpen} maxWidth="sm" onClose={handleCancel} >
                <h2 className="text-xl font-bold mb-4 flex justify-center">
                    दस्तावेज़ का कार्य पूरा हो चुका है?
                </h2>
                <div className="mt-4 space-y-4">
                    <div>
                        <InputLabel size="15px">टिप्पणी</InputLabel>
                        <textarea
                            label="टिप्पणी"
                            name="description"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder="टिप्पणी दर्ज करें"
                            className="w-[100%] h-20 p-2 border-2 border-gray-300 rounded-md resize-none"
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

        </>
    );
};

export default AllResolve;
