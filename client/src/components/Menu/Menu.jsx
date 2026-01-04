import React,{useEffect,useState} from 'react';
import axios from "axios"
import './menu.css';

const Menu = ({cat}) => {
    const [posts, setPosts ] = useState([]);

    useEffect(()=>{
            const fetchData = async ()=>{
                try {
                    if (cat) {
          const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
          // Ensure we set an array
          setPosts(Array.isArray(res.data) ? res.data : []);
        }
                } catch (err) {
                    console.log(err)
                }
            };
            fetchData();
        }, [cat])

         const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }


    return (
        <div className="menu">
            <h1>Other Posts</h1>
            {posts?.map(post=>(
                <div className="posts" key={post.id}>
                    <img src={`../upload/${post.img}`} alt="" />
                    <h2>{post?.title.substring(0,40)}</h2>
                    {/* <p>{getText(post.desc).substring(0, 100)}...</p> */}
                    
                    <button>Read More</button>
                </div>
            ))}

        </div>
    )
}

export default Menu