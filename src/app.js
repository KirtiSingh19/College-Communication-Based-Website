const express = require("express");
const path = require("path");
const app = express();
require("./db/connection");
const staticpath = path.join(__dirname, "../public");
const Mydata = require("./models/registers");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register", { title: "fill form", password: '', email: '' });
});
app.get("/login", (req, res) => {
    res.render("login", { title: "fill form", password: '', email: '' });
});
app.get("/news2", (req, res) => {
    res.render("news2");
})
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.conpassword;
        if (password === cpassword) {
            const regstudent = new Mydata({
                username: req.body.username,
                email: req.body.email,
                password: password,
                conpassword: cpassword
            })
            const Mydatas = await regstudent.save();
            res.render('login',{password:'',email:''});
            const email = req.body.email;
            const useremail = await Mydata.findOne({ email: email});
            if (email === useremail.email) {
                res.render('register', {email: 'email already exists'});
            }
        }
        else {
            res.render('register', { password: 'password does not matching', email: '' });
        }
    }
    catch (error) {
        res.status(201).send(error);
    }
})
app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await Mydata.findOne({ username: username });
        if (user.password === password) {
            const stdata = await Mydata.find().select('username');
            const obdata = JSON.stringify(stdata);
            
           
            res.render("indexx", { username: `${obdata}`, name: `${username}` });
        }
        else {
            res.render("login", { password: "Invalid Username and Password!!" });
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
})
const server=app.listen(4352, () => {
    console.log(`listen on port`,server.address().port);
})
