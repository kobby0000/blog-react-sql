import { useState } from 'react';
import './write.css';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();

  // Note: Value is for the editor (content), Title is for the title input
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData,{
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // 1. ADD ASYNC HERE 👇
  const handleClick = async (e) => {
    e.preventDefault();
    
    // 2. Only upload if there's a file, otherwise use existing image or empty string
    const imgUrl = file ? await upload() : state?.img || "";

    try {
      if (state) {
        // UPDATE POST
        await axios.put(`/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
        }, { withCredentials: true });
        console.log(title)
      } else {
        // CREATE NEW POST
        await axios.post(`/api/posts/`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }, { withCredentials: true });
      }
      navigate("/blog"); // Redirect home after successful post
    } catch (err) {
      console.log(err);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  return (
    <div>
      <section id="add">
        <div className="add container">
          <div className="content">
            <input
              className='title'
              type="text"
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              
            />
            <div className="editor_container">
              <ReactQuill
                className='editor'
                theme="snow"
                value={value}
                modules={modules}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h1>Publish</h1>
              <span><b>Status: </b> Draft</span>
              <span><b>Visibility: </b> Public</span>
              <input 
                style={{ display: "none" }} 
                type="file" 
                id='file' 
                onChange={(e) => setFile(e.target.files[0])} 
              />
              <label className='file' htmlFor="file">Upload Images</label>
              <div className="buttons">
                <button>Save as a draft</button>
                <button onClick={handleClick}>Publish</button>
              </div>
            </div>
            <div className="item">
              <h1>Category</h1>
              {["ai", "design", "web", "trending", "dm", "general"].map((category) => (
                <div className="cat" key={category}>
                  <input 
                    type="radio" 
                    checked={cat === category} 
                    name="cat" 
                    value={category} 
                    id={category} 
                    onChange={(e) => setCat(e.target.value)} 
                  />
                  <label htmlFor={category}>{category.toUpperCase()}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Write;