const express = require("express")
const router = express.Router();
const post = require("../models/post")

// home page
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let perPage = 3;
    let page = req.query.page || 1;

    const data = await post.aggregate([{ $sort: { title: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Count is deprecated - please use countDocuments({}) instead  left at 2:00
    // const count = await Post.count();
    const count = await post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasNextPagePlus = nextPage <= Math.ceil(count * perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasNextPagePlus ? page - 1 : null,
    });
  } catch (error) {
    console.log(error);
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

        let searchTerm = req.body.SearchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z]/g, "");

        const data = await post.find({
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
//missing links someware but teacher sayes it will probably be fine but it will be a potentual problem
