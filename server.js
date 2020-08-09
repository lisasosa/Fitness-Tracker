const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true
});

// require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});