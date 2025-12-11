import React from 'react';
import './blog.css';
import { Link, Links } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "First Blog Post",
            content: "This is the content of the first blog post.",
            img: "https://via.placeholder.com/600x400",
        },
        {
            id: 1,
            title: "First Blog Post",
            content: "This is the content of the first blog post.",
            img: "https://via.placeholder.com/600x400",
        },
        {
            id: 2,
            title: "SecondBlog Post",
            content: "This is the content of the first blog post.",
            img: "https://via.placeholder.com/600x400",
        },
        {
            id: 3,
            title: "Third Blog Post",
            content: "This is the content of the first blog post.",
            img: "https://via.placeholder.com/600x400",
        },
    ];
    return (
        <div>
            <section id="blog_showcase">
                <div className="blog_showcase_wrapper container">
                    Blog
                </div>
            </section>

            <section className="blog_posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="image">
                            <img src={post.img} alt={post.title} />
                        </div>
                        <div className="content">
                            <Link to={`/post/${post.id}`}>
                            <h1>{post.title}</h1></Link>
                            <p>{post.content}</p>
                            <button>Read more</button>
                        </div>

                    </div>
                ))}
            </section>
        </div>
    )
}

export default Blog