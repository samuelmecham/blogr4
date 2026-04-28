const express = require("express")
const router = express.Router();
const post = require("../models/post")

// home page
router.get("/",async (req, res) => {

    
    try {
        const data = await post.find().sort({title: "desc"});
        const locals = {
        title: data.title,
        description:
         "a Blog template application that will be used for your own use.",
        };
        res.render("index", {locals, data});
    }
     catch (error) {
        console.log(error)
    }
});

//get a post by id
router.get("/post/:id", async (req,res) => {
    try {
        let slug = req.params.id;

        const data = await post.findById({_id: slug})

        const locals = {
        title: data.title,
        description:
         "a Blog template application that will be used for your own use.",
        };
        res.render("post", {locals, data})

    } catch (error) {
        console.log(error)
    }
})



// Search Route
router.post("/search", async (req, res) =>{
    try{
        const locals = {
            title: "Search",
            description: "A blog template made with NodeJS and ExpressJS"
        };

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z]/g, "");

        const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecialChar, "i") } },
                { body: {$regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
        });

        res.render("search",{ locals, data}); 
    } catch (error) {
        console.log(error);
    }
    

})


module.exports = router;
//missing links someware but teacher sayes it will probably be fine but it will be a potentual problem left at 1:18 search wont open something wrong
