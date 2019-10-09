
//MONGO-PASSWORD: iXlgaOekqxgZE5zU
// Connection-String: mongodb+srv://patrick:<password>@cluster0-etffg.mongodb.net/test?retryWrites=true&w=majority
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const things = require('./routes/thing.route');
const users = require('./routes/user.route');
const auth = require('./routes/auth.route');

// if (!config.get('jwtPrivateKey')) return new Error('FATAL ERROR: jwtPrivateKey not provided');
const app = require('./app');
app.use((req, res, next) => {
    // middleware used to enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/api/things', things);
app.use('/api/users', users);
app.use('/api/auth', auth);


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/devC', {useNewUrlParser:true})
    .then(() => console.log('Successfully connected to MongoDB... 🙂'))
    .catch( error => console.log('Could not connect to MongoDB  😥', error));

const port = process.env.PORT || 2500;
app.listen(port, console.log(`Listening to port number ${port}`));