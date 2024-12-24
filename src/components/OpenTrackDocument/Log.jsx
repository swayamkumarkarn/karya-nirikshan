import React, { useEffect, useState } from "react";
import { getEventLogById } from "../../services/documentService";
import { CgArrowLongUpR } from "react-icons/cg";

const Log = ({ id }) => {
  const [eventLogs, setEventLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventLogs = async () => {
      try {
        const response = await getEventLogById(id);
        if (response?.data) {
          setEventLogs(response.data);
        } else {
          setError("Event logs not found.");
        }
      } catch (err) {
        setError("Failed to fetch event logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventLogs();
  }, [id]);

  const getActionLabel = (action, index,eventLogs) => {
    // Check for specific actions and map them to their Hindi labels
    if (action.includes("दस्तावेज पंजीकृत")) return "प्रारंभ";
    if (action.includes("दस्तावेज कार्य सम्पूर्ण")) return "सम्पूर्ण";
    if (action.includes("भेजा गया")) return "आगे बढ़ा";
    if (action.includes("दस्तावेज प्राप्त")) return "प्राप्त हुआ";
    if (index==0 && !(action.includes("दस्तावेज कार्य सम्पूर्ण"))) return "प्रसंस्करण"
    
    // Default case: for any other undefined action, show "प्रसंस्कृत"
    return "प्रसंस्कृत";
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Loading event logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 mx-auto max-w-4xl">
      <div className="space-y-4 mb-20">
        {eventLogs.map((log, index) => (
          <div key={log.id}>
            <div className="p-4 bg-gray-50 border border-gray-500 rounded-md shadow-sm">
              <p className="text-sm font-semibold text-gray-800">
                {log.document_number}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {log.action}
              </p>
              <p className="text-xs text-gray-500 mt-1 gap-2">
                विभाग{" "}
                <span className="text-black font-semibold">
                  - {log.handled_department_hindi_name}
                </span>
                <br />
                <span className="text-gray-700 font-semibold gap-2">
                  {new Date(log.timestamp).toLocaleString("hi-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </span>
              </p>
              {log.remark && (
                <p className="text-sm text-gray-600 mt-2">
                  टिप्पणी: <span className="text-black">{log.remark}</span>
                </p>
              )}
              {getActionLabel(log.action, index,eventLogs) && (
                <span
                  className={`block text-sm font-semibold mt-2 text-right text-gray-700`}
                >
                  {getActionLabel(log.action, index,eventLogs)}
                </span>
              )}
            </div>

            {index !== eventLogs.length - 1 && (
              <CgArrowLongUpR
                className=" mx-auto text-gray-500 mt-1 "
                size={30}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Log;
