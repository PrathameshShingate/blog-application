const express = require("express");
const router = express.Router();
const Post = require("../models/post");


router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const categoryName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categoryName) {
      posts = await Post.find({
        categories: {
          $in: [categoryName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post deleted successfuly");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
