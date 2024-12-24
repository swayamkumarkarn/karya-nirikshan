import React from "react";
import QRCode from "react-qr-code";

const QRScanner = ({value}) => {
    
  return (
    <div className="border rounded-lg shadow-md p-4 w-full bg-white max-w-xl h-full flex flex-col justify-center items-center">
      <div className=" max-w-52 w-full mt-4">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div className="font-semibold mt-4 text-center">
        इस QR कोड को किसी भी QR स्कैनर से स्कैन करें <br/> और दस्तावेज़ का विवरण प्राप्त करें।
      </div>
    </div>
  );
};

export default QRScanner;
