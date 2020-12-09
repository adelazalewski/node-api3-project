// code away!
const express = require("express");
const usersRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
//initialize server
const server = express();

//custom logger middlware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} to ${req.url} from ${req.get('Origin')} `);
    next();
}
 //parses json data takes incoming json data and parses it into req.body
 server.use(express.json());
 server.use(logger);

 server.use(usersRouter);
 server.use(postsRouter);

 //make a welcome message to the root route
 server.get('/', (req, res) => {
     res.send("Welcome to another API by Adela Zalewski!!!")
 })



//define some error haldler middleware
//4 params instead of 3 so express just knows this is an error middleware
 server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: "something went wrong please try again later"
	})
})
 //start the server
 server.listen(4000, () => {
	console.log(`Server running at http://localhost:4000`)
})