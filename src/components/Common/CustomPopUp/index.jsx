import { Button, Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { RxCross2 } from "react-icons/rx";

const CustomPopup = ({ open, setOpen, children, maxWidth = "md" ,onClose}) => {
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      className="relative"
    >
      {/* Close button */}
      <div className="absolute top-4 right-4 ">
        <Button onClick={handleClose} className="!p-0">
          <RxCross2 icon="fa-solid fa-xmark" fontSize={"20px"} color="#0005" />
        </Button>
      </div>

      {/* Dialog Content */}
      <DialogContent className="p-6">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomPopup;
