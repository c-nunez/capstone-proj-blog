import express from "express";
import methodOverride from "method-override";
// import path from "path";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("index", {
    posts: posts,
  });
});

app.get("/post/new", (req, res) => {
  res.render("new-post", {});
});

// Renders a form to create a new post
app.post("/post", (req, res) => {
  const { title, content } = req.body;
  const date = new Date().toDateString();
  const newPost = {
    id: posts.length + 1,
    title,
    date,
    content,
  };
  posts.push(newPost);
  res.redirect("/");
  console.log(newPost);
});

//form to edit the post
app.get("/post/:id/edit", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === parseInt(postId));
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("edit-post", { post });
});

//updates a post
app.put("/post/:id", (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const postIndex = posts.findIndex((post) => post.id === parseInt(postId));
  if (postIndex === -1) {
    res.status(404).send("Post not found");
    return;
  }
  posts[postIndex].title = title;
  posts[postIndex].content = content;
  res.redirect("/");
});

//deletes a post
app.delete("/post/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = posts.findIndex((post) => post.id === parseInt(postId));
  if (postIndex === -1) {
    res.status(404).send("Post not found");
    return;
  }
  posts.splice(postIndex, 1);
  res.redirect("/");
});

//displays post content
app.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === parseInt(postId));
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post", { post });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
