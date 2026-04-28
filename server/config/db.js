const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8"]);
const mongoose = require("mongoose");

const dbPath = process.env.MONGO_URI;

const conectDB = async ()=> {
    try {
        await mongoose.connect(dbPath);
        console.log('mongodb conected')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectDB;