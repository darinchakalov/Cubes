const mongoose = require('mongoose');

const initDB = (url) => mongoose.connect(url);

module.exports = initDB;