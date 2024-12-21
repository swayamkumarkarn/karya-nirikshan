import React, { useEffect, useState } from "react";
import { getEventLogById } from "../../services/documentService";

const EventDetails = ({ id }) => {
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

  if (loading) {
    return (
      <div className="px-4 py-3">
        <h1 className="text-xl font-bold mb-1">कार्य विवरण</h1>
        <div className="border rounded-lg shadow-md p-4 bg-white max-w-5xl">
          <div
            className="grid grid-cols-5 gap-4 py-2 animate-pulse"
            style={{
              gridTemplateColumns: "2fr 2fr 4fr 4fr 4fr 6fr",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <React.Fragment key={index}>
                <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                <div className="bg-gray-300 h-6 w-full rounded"></div>
              </React.Fragment>
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
      <h1 className="text-xl font-bold mb-1">कार्य विवरण</h1>

      {/* Table Header */}
      <div
        className="grid grid-cols-5 gap-4 text-gray-400 font-semibold text-md bg-gray-100 px-4 py-2 rounded-lg text-center"
        style={{
          gridTemplateColumns: "2fr 2fr 4fr 4fr 4fr 6fr",
        }}
      >
        <div>तारीख</div>
        <div>समय</div>
        <div>विभाग</div>
        <div>इवेंट</div>
        <div>द्वारा संभाला गया</div>
        <div>टिप्पणी</div>
      </div>

      {/* Event Log Rows */}
      <div className="space-y-4">
        {eventLogs.map((log) => {
          const [date, time] = new Date(log.timestamp).toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short",
          }).split(", ");

          return (
            <div
              key={log.id}
              className="grid grid-cols-5 gap-4 p-3 text-center justify-center items-center bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-black"
              style={{
                gridTemplateColumns: "2fr 2fr 4fr 4fr 4fr 6fr",
              }}
            >
              <div className="font-semibold text-gray-400">{date}</div>
              <div className="font-semibold">{time}</div>
              <div>{log.handled_department_hindi_name}</div>
              <div className="text-seaGreen font-semibold capitalize">
                {log.action}
              </div>
              <div>{log.handled_user_name}</div>
              <div>{log.remark || "—"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventDetails;
