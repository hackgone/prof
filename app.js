const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
  var firstname= req.body.ffirst;
  var lastname= req.body.flast;
  var emailid= req.body.femail;
  var data={
    members:[
      {
        email_address: emailid,
        status: "subscribed",
        merge_fields: {
        FNAME:firstname,
        LNAME:lastname,
      },
      }
    ]
  }
  var jsonData=JSON.stringify(data);
  const url="https://us7.api.mailchimp.com/3.0/lists/2151386e78";
  const options={
    method:"POST",
    auth:"xyzx:51c53863f1ca9a54becefba45a0adb18-us7"
  }
  const response=https.request(url,options,function (response) {
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");

    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  response.write(jsonData);
  response.end();
})
app.post("/failure",function (req,res) {
  res.redirect("/");

})

app.listen(process.env.PORT || 3000,function () {
  console.log("running");

})
