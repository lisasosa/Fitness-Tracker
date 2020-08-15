require('.env').config();
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

let uri = "mongodb://localhost/workout";
if (process.env.NODE_ENV === "production") {
    uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});