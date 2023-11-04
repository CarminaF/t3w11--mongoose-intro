const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SightingSchema = new Schema({
    location: {
        type: String,
        required: true,
        unique: false
    },
    time: {
        type: Date,
        required: false,
        unique: false,
        default: new Date(Date.now())
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cats: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cat'
        }
    ]
});

// populate on all find ___ methods so controller code is cleaner and shorter
// SightingSchema(/find/i, async (docs) => {
//     console.log("This hook runs after any find___ model method");
//     console.log(docs);

//     let result = typeof docs === "array" ?
//     await docs[0].populate('user cats', '-password')
//     :
//     await docs.populate('user cats', '-password');

//     return result;
// });


const Sighting = mongoose.model('Sighting', SightingSchema)

module.exports = {
    Sighting
}