
'use strict';
const RecipePost = require( '../models/Recipe' );


exports.saveRecipe = ( req, res ) => {
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to the forum.")
  }

  let newRecipePost = new RecipePost(
   {
    userId: req.user._id,
    userName:req.user.googlename,
    post: req.body.post,
    createdAt: new Date()
   }
  )

  newRecipePost.save()
    .then( () => {
      res.redirect( '/showRecipes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


// this displays all of the skills
exports.getAllRecipes = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  RecipePost.find({}).sort({createdAt: -1})
    .exec()
    .then( ( posts ) => {
      res.render('recipes',{posts: posts,title:"Recipes"})
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {

    } );
};

exports.deleteRecipe = (req, res) => {
  console.log("in deleteRecipe")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
        Recipe.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      ForumPost.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/recipes')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('/recipes')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};
