//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require ("lodash");


const homeStartingContent = "This is a page where you can post your daily inputs. You should write your inputs on a Compose page, and than publish them on Home page. Amount of text on Home page is 100 characters, but you can click on a link Read more, to see the whole text.";
const aboutContent = "I'm Sabina Bojadžić. This is an example of a Daily journal, where you can write your daily inputs. It is made with a help from Angela Yu and App Brewery.";
const contactContent = "Sabina Bojadžić";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("home", {homeStartingContent: homeStartingContent, posts: posts});

});

app.get("/about", function(req, res){
	res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
	res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
	res.render("compose");
});

app.post("/compose", function(req, res){
	const post = {
		Title: req.body.text,
		Post: req.body.textarea
	};
	posts.push(post);

	res.redirect("/");
});


app.get("/posts/:name", function(req, res){
	var params = _.lowerCase(req.params.name);



posts.forEach(function(post){
	var title = _.lowerCase(post.Title);

if (title === params) {
	res.render("post", {posts: posts});
}else{
	console.log("Not a Match");
};
});

});

app.listen(3000, function() {
  ("Server started on port 3000");
});
