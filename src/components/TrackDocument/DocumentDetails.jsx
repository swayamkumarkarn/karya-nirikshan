import React, { useEffect, useState } from "react";
import { getDocumentById } from "../../services/documentService";

const DocumentDetails = ({ id }) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await getDocumentById(id);
        if (response?.data) {
          setDocument(response.data);
        } else {
          setError("Document not found.");
        }
      } catch (err) {
        setError("Failed to fetch document.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-3">
        <h1 className="text-xl font-bold mb-1">दस्तावेज़ विवरण</h1>
        <div className="border rounded-lg shadow-md p-4 bg-white max-w-lg">
          <div
            className="grid grid-cols-2 py-1 gap-y-1 text-sm text-gray-400 items-start"
            style={{
              gridTemplateColumns: "4fr 8fr",
            }}
          >
            <span className="font-semibold">दस्तावेज़ संख्या:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">आवक/ जावक संख्या:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">दर्ज रजिस्टर:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">संदर्भ विभाग:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">शीर्षक:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">विवरण:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">प्राथमिकता श्रेणी:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">ग्रेड:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">वर्तमान विभाग:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>

            <span className="font-semibold">स्थिति:</span>
            <span className="bg-gray-300 h-4 w-full rounded animate-pulse"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="px-4 py-3 text-red-500">{error}</div>;
  }

  return (
    <div className="px-4 py-3">
      <h1 className="text-xl font-bold mb-1">दस्तावेज़ विवरण</h1>
      <div className="border rounded-lg shadow-md p-4 bg-white max-w-lg">
        <div
          className="grid grid-cols-2 py-1 gap-y-1 text-sm text-gray-400 items-start"
          style={{
            gridTemplateColumns: "4fr 8fr",
          }}
        >
          <span className="font-semibold">दस्तावेज़ संख्या:</span>
          <span className="font-semibold text-black">
            {document.document_number}
          </span>

          <span className="font-semibold">आवक/ जावक संख्या:</span>
          <span className="text-black">{document.dispatch_doc_number}</span>

          <span className="font-semibold">दर्ज रजिस्टर:</span>
          <span className="text-black">{document.register_hindi_name}</span>

          <span className="font-semibold">संदर्भ विभाग:</span>
          <span className="text-black">{document.department_hindi_name}</span>

          <span className="font-semibold">शीर्षक:</span>
          <span className="font-bold text-black">{document.title}</span>

          <span className="font-semibold">विवरण:</span>
          <span className="text-black">{document.description}</span>

          <span className="font-semibold">प्राथमिकता श्रेणी:</span>
          <span className="font-semibold text-seaGreen capitalize">
            {document.priority}
          </span>

          <span className="font-semibold">ग्रेड:</span>
          <span>
            <div
              className={`w-fit px-3 font-semibold rounded-lg ${
                document.grade === "A"
                  ? "bg-red-100 text-red-800"
                  : document.grade === "B"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              ग्रेड - {document.grade}
            </div>
          </span>

          <span className="font-semibold">वर्तमान विभाग:</span>
          <span className="text-black">
            {document.current_department_hindi_name}
          </span>

          <span className="font-semibold">स्थिति:</span>
          <span
            className={`font-semibold ${
              document.status === "created"
                ? "text-yellow-500"
                : document.status === "completed"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {document.status === "created"
              ? "निर्मित (Created)"
              : document.status === "completed"
              ? "पूर्ण (Completed)"
              : "अपूर्ण (Incomplete)"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
