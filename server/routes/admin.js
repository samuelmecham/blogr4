const express = require("express");
const router = express.Router();
const post = require("../models/post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("./main");
const jwtSecret = process.env.JWT_SECRET;
const adminLayout = "../views/layouts/admin";

/**
 * GET /
 * admin - Check Login
 */
router.get("/admin",async (requestAnimationFrame, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "a blog template made with nodejs and expressjs",
        };
        res.render("admin/index", {locals, layout: adminLayout} );
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;