import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getPosts = (req, res) => {
  // Fix: Removed the trailing "WHERE"
  const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=?" 
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q = 
    "SELECT p.id, u.username, p.title, p.`desc`, p.img, u.image AS userImg, p.cat, p.date " +
    "FROM users u JOIN posts p ON u.id = p.uid " +
    "WHERE p.id = ?";
  
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.log("SQL Error in getPost:", err);
      return res.status(500).json(err);
    }
    // Return the single object
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authorized!");

  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

    // Ensure userInfo.id matches your DB (is it 'id' or 'uid' in the JWT?)
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id, 
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("SQL Error:", err); // CHECK YOUR TERMINAL FOR THIS
        return res.status(500).json(err);
      }
      return res.status(200).json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authorized!");

  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    // Fix: Corrected backticks and spacing
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      return res.json("Post has been deleted");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authorized!");

  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    // Fix: Added WHERE clause to specify which post to update
    const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
    
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated");
    });
  });
};