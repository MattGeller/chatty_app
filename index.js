//make express right away (and put it in app, of course)
const app = require('express')();
const bodyParser = require('body-parser');
const router = require('./routes/auth_routes');
const mongoose = require('mongoose');
//are you going to allow requests from other websites? by doing cors, the answer is yes
const cors = require('cors');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;

//connect to the database
mongoose.connect(keys.db_connect, {
    //just a fix to deprecation warnings
    useMongoClient: true
});

//remove all cors restrictions (not the best idea for a production app)
app.use(cors());

//body parser gets the POST variables and they'll end up in response.body
app.use(bodyParser.json({type: '*/*'})); // '*/*' means however the data is sent, it's ok

router(app);

app.listen(PORT, (err) => {
    if(err) return console.log('Error Starting Server:', err);

    console.log('Server running at localhost:' + PORT);
});