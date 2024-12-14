import { useParams } from "react-router-dom";

const TrackDocId = () => {
  const { id } = useParams();
  return <h1>TrackDoc ID: {id}</h1>;
};

export default TrackDocId;