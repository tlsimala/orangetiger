'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var clothesSchema = Schema( {
  type: String,
  classification: Array,
  img:{ data: Buffer, contentType: String }
} )


module.exports = mongoose.model( 'Clothes', clothesSchema );
