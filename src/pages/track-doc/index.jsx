import React from "react";
import DocumentDetails from "../../components/TrackDocument/DocumentDetails";
import EventDetails from "../../components/TrackDocument/EventDetails";

const TrackDoc = () => {

  return (
    <>
      <DocumentDetails id={"c96d2f3c-9b72-44ce-af8f-b173a35e7084"} />

      <div className="px-4 py-3">
        <div className="w-[90%]">
          <EventDetails id={"968ef1b5-1d0d-4c07-9374-067b748d1e06"} />
        </div>
      </div>
    </>
  );
};

export const meta = {
  title: "दस्तावेज़ ट्रैक करें",
  description: "दस्तावेज़ ट्रैकिंग",
};

export default TrackDoc;
