const { mongoose } = require('mongoose');
const { databaseConnect } = require('./database');
const { Cat } = require('./models/CatModel');
const { User } = require('./models/UserModel');
const { Sighting } = require('./models/SightingModel');


databaseConnect().then(async() => {
    console.log("Creating seed data!");

    // const Cat = mongoose.model('Cat', {
    //     name: String,
    //     colour: String,
    //     breed: String,
    //     favouritePlacesToSit: [String],
    //     gender: String,
    //     age: Number, // integer
    //     safeToPet: Boolean,
    //     weightKg: Number, // float/decimal
    //     favouriteToys: [String],
    //     photos: [String]
    // });

    let newLina = new Cat({
        name: "Lino",
        colour: "orange",
        breed: "meowth",
        favouritePlacesToSit: ["keyboard", "Zachs shoulder"],
        gender: "female",
        age: 2,
        safeToPet: true,
        weightKg: 5.5,
        favouriteToys:["Zachs keyboard", "coffee mug"],
        photos: ["http://google.com"]

    })

    await newLina.save().then(() => {
        console.log("Lina is in the DB");
    });
    let newUser = await User.create({
        username: "CatLord",
        password: "CatsRule"

    })

    let newSighting = await Sighting.create({
        location: "Sydney",
        user: newUser._id,
        cats: [
            newLina._id
        ]
    })

}).then(async() => {

})