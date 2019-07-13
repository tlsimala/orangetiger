'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var RecipeSchema = Schema( {
  userId: ObjectId,
  userName: String,
  post: String,
  createdAt: Date
} );

module.exports = mongoose.model( 'RecipePost', RecipeSchema );
