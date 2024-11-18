const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url:String,
        filename:String,
    }
    ,
    price:{
        type: Number,
        required: true
    },
    location:{  
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
    ,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
    ,
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    

    
    
});

let Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;