const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const hateoasLinker = require("express-hateoas-links");

connectDB();
const app = express();

app.use(express.json());
app.use(hateoasLinker);

app.use(express.urlencoded({ extended: false }));

app.use("/api/articles", require("./routes/article"));

app.use("/api/comments", require("./routes/comment"));

app.use("/api/users", require("./routes/user"));
// hateoasLinker(app);
app.get("/", function (req, res) {
  // create an example JSON Schema
  var personSchema = {
    name: "mohamed",
    description:
      "This JSON Schema defines the parameters required to create a Person object",
    // properties: {
    //   name: {
    //     title: "mohamed",
    //     description: "Hello",
    //     type: "string",
    //     maxLength: 30,
    //     minLength: 1,
    //     required: true,
    //   },
    //   jobTitle: {
    //     title: "Job Title",
    //     type: "string",
    //   },
    //   telephone: {
    //     title: "Telephone Number",
    //     description: "Please enter telephone number including country code",
    //     type: "string",
    //     required: true,
    //   },
    // },
  };

  // call res.json as normal but pass second param as array of links
  res.json(personSchema, [
    { rel: "self", method: "GET", href: "http://127.0.0.1" },
    {
      rel: "create",
      method: "POST",
      title: "Create article",
      href: "http://127.0.0.1/api/articles/:id",
    },
    {
      rel: "Get",
      method: "GET",
      title: "get all articles",
      href: "http://127.0.0.1/api/articles",
    },
    {
      rel: "Delete",
      method: "DELETE",
      title: "Delete article",
      href: "http://127.0.0.1/api/articles/:id",
    },
    {
      rel: "update",
      method: "PUT",
      title: "update article",
      href: "http://127.0.0.1/api/articles/:id",
    },
    {
      rel: "create",
      method: "POST",
      title: "Create comment",
      href: "http://127.0.0.1/api/comments/:id",
    },
    {
      rel: "get",
      method: "GET",
      title: "get all comments",
      href: "http://127.0.0.1/api/comments",
    },
    {
      rel: "Delete",
      method: "DELETE",
      title: "Delete comments",
      href: "http://127.0.0.1/api/comments/:id",
    },
    {
      rel: "update",
      method: "PUT",
      title: "update comment",
      href: "http://127.0.0.1/api/comments/:id",
    },
  ]);
});

app.listen(8000, () => console.log(`Connected to Server`.white.bgBlue));
