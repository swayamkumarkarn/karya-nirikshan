import React, { useState } from "react";
import DocumentDetails from "../../components/TrackDocument/DocumentDetails";
import EventDetails from "../../components/TrackDocument/EventDetails";

import { useParams } from "react-router-dom";


const TrackDocId = () => {
  const { id } = useParams();

  // id="968ef1b5-1d0d-4c07-9374-067b748d1e06"

  const [refreshLogs, setRefreshLogs] = useState(false);

  // Function to toggle refresh state
  const triggerLogRefresh = () => {
    setRefreshLogs((prev) => !prev);
  };
  return (
    <>
      <DocumentDetails id={id} onLogCreated={triggerLogRefresh} refresh={refreshLogs}/>

      <div className="w-[90%]">
        <EventDetails id={id} refresh={refreshLogs} />
      </div>
    </>
  );
};

export const meta = {
  title: `दस्तावेज़ ट्रैकर`,
  description: "दस्तावेज़ ट्रैकिंग",
};

export default TrackDocId;
