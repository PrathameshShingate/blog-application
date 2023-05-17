import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.css";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/posts" + search);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPosts();
  }, [search]);
  
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id}/>
      ))}
    </div>
  );
};

export default Posts;
