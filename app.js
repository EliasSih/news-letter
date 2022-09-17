// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("request");
const client = require("mailchimp-marketing");

client.setConfig({
  apiKey: "87193ec4055fa99284bd55854c22d416-us17",
  server: "us17",
});


const app = express();

app.use(express.static("public")); //this allows us to render static files i.e local stylesheet
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email  = req.body.email;

  console.log(firstName, lastName, email);

  const run = async () => {
  const response = await client.lists.batchListMembers("378cd6695a", {
    members: [{
      email_address:email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }],
  });
  console.log("server response:....................................")
  // console.log(response.new_members[0].status);
  console.log(response);
  if(response.new_members[0].status === "subscribed"){
    res.sendFile(__dirname + "/failure.html");
  } else{
    res.sendFile(__dirname + "/failure.html");
  }

};

run();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is running on port 3000");
});

// Audience ID
// 378cd6695a

// API Key
// 87193ec4055fa99284bd55854c22d416-us17
