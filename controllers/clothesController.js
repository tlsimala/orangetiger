'use strict';
const clothes = require( '../models/clothes' );

exports.saveSkill = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newSkill = new Skill( {
  //  type: req.body.file,
    classification: req.body.weather,
    img: req.body.file
  } )

  //console.log("skill = "+newSkill)

  newSkill.save()
    .then( () => {
      res.redirect( '/skills' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


// this displays all of the skills
exports.getAllClothes = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  clothes.find( )
    .exec()
    .then( ( skills ) => {
      res.render( 'clothes', {
        clothes: clothes, title: "Closet"  //json object please check to make sure it is okay??
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
