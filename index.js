import express from "express";
import { marked } from "marked";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req,res) => {
    var blogText = marked(fs.readFileSync("posts/test.md", "utf8"));
    res.render("index.ejs", {
        blog: blogText
    });
});

app.get("/new_post", (req,res) => {
    res.render("new_post.ejs", {
    });
});

app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
});