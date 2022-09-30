import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { webRouter } from "./src/routers/web.router";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const port = 8080;
const DB_URL = "mongodb://localhost:27017/dbdemo"

app.set('views','./src/views');
app.set('view engine','ejs');
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(flash());
app.use(express.json());
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: ({ maxAge: 1000000, secure: false })
}));

mongoose.connect(DB_URL)
    .then(() => console.log(`DB connected`))
    .catch(err => console.log(err.message))

    app.use('/', webRouter);

app.listen(port, () => {
    console.log(`running at http://localhost:${port}`)
})