const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.kpis = require("./kpi.model.js")(mongoose);
db.st_kpis = require("./st_kpi.model.js")(mongoose);

module.exports = db;