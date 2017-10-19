//make express right away (and put it in app, of course)
const app = require('express')();
const bodyParser = require('body-parser');
const router = require('./routes/auth_routes');
const mogoose = require('mongoose');
//are you going to allow requests from other websites? by doing cors, the answer is yes
const cors = require('cors');

//TODO: finish setting up mLab DB