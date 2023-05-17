import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";

const Single = () => {
  const { id } = useParams();

  return (
    <div className="single">
      <SinglePost id={id} />
      <Sidebar />
    </div>
  );
};

export default Single;
