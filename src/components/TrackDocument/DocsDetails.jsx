import React, { useEffect, useState } from "react";
import { getDocumentById } from "../../services/documentService"; // Import the API function

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
            className="grid grid-cols-2 py-1 gap-y-1 text-sm text-gray-400 items-start animate-pulse"
            style={{
              gridTemplateColumns: "4fr 8fr",
            }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <>
                <span
                  key={`label-${index}`}
                  className="bg-gray-300 h-4 w-3/4 rounded"
                ></span>
                <span
                  key={`value-${index}`}
                  className="bg-gray-300 h-4 w-full rounded"
                ></span>
              </>
            ))}
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

          <span className="font-semibold">डिस्पैच संख्या:</span>
          <span className="font-semibold text-black">
            {document.dispatch_doc_number}
          </span>

          <span className="font-semibold">आवेदक:</span>
          <span className="font-semibold text-black">
            {document.created_by}
          </span>

          <span className="font-semibold">विभाग:</span>
          <span className="font-semibold text-black">
            {document.department_name}
          </span>

          <span className="font-semibold">श्रेणी:</span>
          <span className="font-semibold text-seaGreen">
            {document.priority}
          </span>

          <span className="font-semibold">ग्रेड:</span>
          <span className="font-semibold text-black">ग्रेड - {document.grade}</span>

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
              : "अपूर्ण (Incompleted)"}
          </span>

          <span className="font-semibold">वर्तमान विभाग:</span>
          <span className="font-semibold text-black">
            {document.current_department}
          </span>

          <span className="font-semibold">रजिस्टर नाम:</span>
          <span className="font-semibold text-black">
            {document.register_name}
          </span>

          <span className="font-semibold">टैग्स:</span>
          <span className="font-semibold text-black">
            {document.tags.length > 0
              ? document.tags.join(", ")
              : "कोई टैग नहीं"}
          </span>

          <span className="font-semibold">शीर्षक:</span>
          <span className="font-bold text-black">{document.title}</span>

          <span className="font-semibold">विवरण:</span>
          <span className="font-bold text-black">{document.description}</span>

          <span className="font-semibold">लॉग्स:</span>
          <span className="font-semibold text-black">
            {document.logs.length > 0 ? (
              <ul className="list-disc pl-4">
                {document.logs.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            ) : (
              "कोई लॉग्स नहीं"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
