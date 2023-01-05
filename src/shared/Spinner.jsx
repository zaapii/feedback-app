import { useContext } from "react";
import RingLoader from "react-spinners/RingLoader";
import FeedbackContext from "../context/FeedbackContext";

const Spinner = () => {
  const { loading } = useContext(FeedbackContext);

  return (
    <div style={{ display: 'flex', justifyContent: "center", marginTop: '2rem' }}>
      <RingLoader color="#ff6a95" loading={loading} size={100} />
    </div>
  );
};

export default Spinner;
