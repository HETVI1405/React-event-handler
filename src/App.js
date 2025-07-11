import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cardlist from "../Cardlist";

export default function App() {
  const [post, setPost] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(true);
  const [Page, setCurrentPage] = useState(1);

  async function getDataFromServer() {
    setloading(true);
    try {
      const res = await axios.get(
        https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${Page}
      );
      setPost(res.data);
      seterror(false);
      setsuccess(true);
      setTimeout(() => {
        setsuccess(false);
      }, 1000);
    } catch (error) {
      seterror(true);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getDataFromServer();
  }, [Page]);

  if (loading) {
    return <p style={{ color: "green" }}>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Data not found....</p>;
  }

  return (
    <div>
      <h2>All Posts</h2>
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={Page === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>{Page}</span>
        <button onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
      </div>
      {success && <p style={{ color: "green" }}>Data loaded successfully...</p>}

      {post.map((el) => (
        <Cardlist key={el.id} el={el} />
      ))}
    </div>
  );
}