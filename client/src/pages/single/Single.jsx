import React,{useState,useEffect, useContext} from 'react';
import './single.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Link,useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import moment from "moment";



const Single = () => {
  const [post, setPost ] = useState({});
  const {currentUser} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2]

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
                setPost(res.data)
                console.log("Server Response:", res.data);
            } catch (err) {
                console.log(err)
                
            }
            // navigate('/');
        };
        fetchData();
    }, [postId])

    const handleDelete = async ()=>{
       try {
               await axios.delete(`http://localhost:8800/api/posts/${postId}`);
                navigate("/blog")
            } catch (err) {
                console.log(err)
                
            }
    }
     const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

  return (
    <div id='single'>
      <div className="single container">
        <article className="content">
          <img className='image' src={`../upload/${post?.img}`} alt="" />
          <div className="user">
            { post.userImg && <img src={`/upload/${post.userImg}`} alt="" />}
            <div className="info">
              <span className='author'>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser .username=== post.username && (
            <div className="edit">
              <Link  to={'/write?edit=2'} state={post}><FiEdit /></Link>
              <Link onClick={handleDelete}><MdDeleteForever /></Link>
            </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="desc">
            {getText(post.desc)}
          </div>
        </article>
        <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single