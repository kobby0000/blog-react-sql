import React,{ useState,useEffect } from 'react';
import './blog.css';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Blog = () => {
    const [posts, setPosts ] = useState([]);

    const cat = useLocation().search

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
                setPosts(res.data)
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
        <div>
            <section id="blog_showcase" className='blog_showcase'>
                <div className="blog_showcase_wrapper container">
                    <h3>Get the latest gist</h3>
                    <p>Just Every Digital</p>
                </div>
            </section>

            <section className="blog_posts">
                <div className="categories">
                    <Link className='link' to='/?cat=art'>
                        <h6> Art</h6>
                    </Link>
                    <Link className='link' to='/?cat=sience'>
                        <h6> Science</h6>
                    </Link>
                    <Link className='link' to='/?cat=technology'>
                        <h6> Technology</h6>
                    </Link>
                    <Link className='link' to='/?cat=cinema'>
                        <h6> Cinema</h6>
                    </Link>
                    <Link className='link' to='/?cat=design'>
                        <h6> Design</h6>
                    </Link>
                </div>
                <div className="blog_posts_wrapper">
                    {posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="image">
                                <img src={`/upload/${post.img}`} alt={post.title} />
                            </div>
                            <div className="content">
                                <span className='category'>Category</span>
                                <Link className='link' to={`/post/${post.id}`}>
                                    <h1>{post.title}</h1>
                                </Link>
                                <div className="desc">
                                <p>{getText(post.desc).substring(0, 100)}...</p>

                                </div>
                                {/* <button>Read more</button> */}
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Blog