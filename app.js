import express from 'express'
import cors from 'cors'
import HelloController
    from "./controllers/hello-controller.js"
import UserController
    from "./controllers/users/users-controller.js"
import TuitsController
    from "./controllers/tuits/tuits-controller.js";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/tuiter';
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => {
    if (mongoose.connection.readyState === 1) {
      console.log('Connected to MongoDB database');
    } else {
      console.log('Error connecting to MongoDB database');
    }
});
const app = express()
app.use(cors()) // configure cors right after instantiating express
app.use(express.json())
TuitsController(app)
HelloController(app)
UserController(app)
// app.listen(4000)
app.listen(process.env.PORT || 4000);

