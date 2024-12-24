import React, { useState } from "react";
import DocumentDetails from "../../components/OpenTrackDocument/DocumentDetails";
import EventDetails from "../../components/OpenTrackDocument/EventDetails";
import { useParams } from "react-router-dom";
import Log from "../../components/OpenTrackDocument/Log";

const TrackDocId = () => {
  const { id } = useParams();

  // id="968ef1b5-1d0d-4c07-9374-067b748d1e06"
  return (
    <div className="bg-gray-100 w-full overflow-hidden overflow-y-scroll mt-1 h-true-screen sm:h-screen ">
      <DocumentDetails id={id} />
      <Log id={id} />

      {/* <div className="w-[90%]">
        <EventDetails id={id} />
      </div> */}
    </div>
  );
};

export const meta = {
  title: `दस्तावेज़ ट्रैकर`,
  description: "दस्तावेज़ ट्रैकिंग",
};

export default TrackDocId;
