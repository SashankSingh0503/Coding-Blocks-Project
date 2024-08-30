const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = client.db("Signup");
const coll = db.collection("Users");
let userinfo = {};


async function connectToMongo(){
    try{
        await client.connect();
        console.log("Connected to mongodb");
    }
    catch(err){
        console.log("Error : " + err);
    }
};

connectToMongo().then(()=>{
    const express = require("express");
const PORT = 3800;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/Signup'));
app.use(express.static(__dirname + '/Signin'));
app.use(express.static(__dirname + '/Signin_Signup'));
app.use(express.static(__dirname + '/Dashboard'));

app.get("/signup" , (req,res)=>{
    res.sendFile(__dirname + "/Signup/index.htm");
});

app.post("/signup" , (req,res)=>{
    req.body.username = (req.body.name).slice(0,3) + (req.body.phone).slice(0,3);
    console.log(req.body);
    userdetails = req.body;
    coll.insertOne(req.body);
    res.sendFile(__dirname + "/Signin/index.htm");
});

app.post("/signin" ,async (req,res)=>{
    try {
        const query = {};
        if (req.body.phone) {
            query.phone = req.body.phone;
        }
        if (req.body.password) {
            query.password = req.body.password;
        }
        const data = await db.collection("Users").find(query).toArray();
        userinfo = data;
        if(data.length === 0)
                res.send("No data found..");
            else{
                res.sendFile(__dirname + "/Dashboard/index.html");
        } 
    }
    catch (err) {
        console.error("Error searching data:", err);
        res.status(500).send("Error searching data");
    }
});

app.get("/user-data",(req,res)=>{
    res.json(userinfo);
});

app.post("/optionsignin" , (req,res)=>{
    console.log(req.body);
    res.sendFile(__dirname + "/Signin/index.htm");
});

app.post("/optionsingup" , (req,res)=>{
    console.log("Signup called");
    res.sendFile(__dirname + "/Signup/index.htm");
})

app.get("/Signin" , (req,res)=>{
    res.sendFile(__dirname + "/Signin/index.htm");
});

app.get("/project" , (req,res)=>{
    res.sendFile(__dirname + "/Signin_Signup/index.htm");
});

app.post("/profile" , (req,res)=>{
    res.sendFile(__dirname + "/Dashboard/profile.html");
});

app.post("/about" , (req,res)=>{
    res.sendFile(__dirname + "/Dashboard/about.html");
});

app.post("/Dashboard",(req,res)=>{
    res.sendFile(__dirname + "/Dashboard/index.html");
});


app.listen(PORT , ()=>{
    console.log("Server is listening on port number: " + PORT);
});

});

process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log("MongoDB connection closed");
        process.exit(0);
    } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
    }
});

