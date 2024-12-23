import React, { useState } from 'react';
import CustomPopup from '../Common/CustomPopUp';
import { Snackbar, Alert, InputLabel } from '@mui/material';
import CustomButton from '../Common/CustomButton';
import { docDispose } from '../../services/documentService';

const AllResolve = ({ open, setOpen, documentId, userId }) => {
    const [remark, setRemark] = useState('');
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

    const handleAccept = async () => {
        try {
            if (!documentId || !userId) {
                setAlert({
                    open: true,
                    severity: 'warning',
                    message: 'दस्तावेज़ आईडी और उपयोगकर्ता आईडी अनिवार्य है।',
                });
                return;
            }

            await docDispose(documentId, userId, remark);
            setAlert({
                open: true,
                severity: 'success',
                message: ' दस्तावेज़ निराकरण पूर्ण हुआ।',
            });
            setOpen(false); // Close the popup after accepting
        } catch (error) {
            console.error('Error disposing document:', error);
            setAlert({
                open: true,
                severity: 'error',
                message: 'दस्तावेज़ के निराकरण में त्रुटि हुई।',
            });
        }
    };

    const handleCancel = () => {
        setAlert({
            open: true,
            severity: 'info',
            message: 'कार्य रद्द कर दिया गया।',
        });
        setOpen(false); // Close the popup after canceling
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <>
            <CustomPopup open={open} setOpen={setOpen} maxWidth="sm">
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

            <Snackbar
                open={alert.open}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AllResolve;
