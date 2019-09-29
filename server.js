const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

let Users = require("./routes/Users");
let Admins = require("./routes/Admins")
let Flows = require("./routes/Flows")
let Events = require("./routes/Events")
let Missions = require("./routes/Missions")
let Submission = require("./routes/Submissions")

app.use('/users', Users)
app.use('/admins', Admins)
app.use('/flows', Flows)
app.use('/events', Events)
app.use('/missions', Missions)
app.use('/submissions', Submission)

app.listen(port, () => {
    console.log('Server is running at the port: ', port)
})
