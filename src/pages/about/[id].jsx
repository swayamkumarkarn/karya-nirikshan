import { useParams } from "react-router-dom";

const AboutId = () => {
  const { id } = useParams();
  return <h1>About ID: {id}</h1>;
};

export default AboutId;