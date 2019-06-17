'use strict';
const Clothes = require( '../models/Clothes' );

exports.saveClothes = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newClothes = new Clothes(
   {
    file: req.body.file
    //type: req.body.type,
  //  classification: req.body.list
   }
  )

  //console.log("skill = "+newSkill)

  newClothes.save()
    .then( () => {
      res.redirect( '/showClothes' );
    } )
    .catch( error => {
      res.send( error );
    } );
};



// this displays all of the skills
exports.getAllClothes = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  Clothes.find()
    .exec()
    .then( ( clothes ) => {
      res.render( 'clothes', {
        clothes:clothes, title:"Clothes"
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
