'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var clothesSchema = Schema( {
  file: String
  //type: String,
  //classification: String
  //img: { data: Buffer, contentType: String }
} );


module.exports = mongoose.model( 'Clothes', clothesSchema );
