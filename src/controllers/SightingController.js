const express = require('express');
const { Sighting } = require('../models/SightingModel');
const router = express.Router();

// Find ALL cats in the DB
router.get("/all", async (request, response) => {
	// Empty object in .find() means get ALL documents
	let result = await Sighting.find({});

	response.json({
		sighting: result
	});

});


// Find one sighting by its ID
router.get("/one/id/:id", async (request, response) => {
	let result = await Sighting.findById(request.params.id).populate('user cats', '-password').catch(error => error);

	response.json({
		sightings: result
	});

});

// Find one cat by its name 
// localhost:3000/sightings/multiple/location/locationToSearchFor
router.get("/multiple/location/:locationToSearchFor", async (request, response) => {
	let result = await Sighting.find({location: request.params.locationToSearchFor}).populate('user cats', '-password');

	response.json({
		sighting: result
	});

});

router.get("/multiple/breed/:breedToFilterBy", async (request, response) => {
	let result = null;

	response.json({
		sighting: result
	});

});



// POST localhost:3000/cats/
router.post("/", async (request, response) => {
	
    // Populate style 1
    // error handling via Promise.catch
    let result = await Sighting.create(request.body).catch((error) => {return error});
    result = await result.populate('cats');
    result = await result.populate('user', '-password')
    

    // Populate style 2
    // let result = await Sighting
    // .create(request.body)
    // .catch((error) => {return error});

    // let newSighting = await Sighting
    // .findOne({id: result._id})
    // .populate('cats')
    // .populate('user', 'username')
    // .catch((error) => {return error});

    
	response.json({
		sighting: result
	});

});

// Update an existing cat in the DB.
// Find one cat by its ID, and modify that cat. 
// Patch is for whatever properties are provided,
// does not overwrite or remove any unmentioned properties of the cat 
router.patch("/:id", async (request, response) => {
	let result = await Sighting.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            returnDocument: "after",
            upsert: true
        }
        ).catch(error => error);

	response.json({
		sighting: result
	});

});

// Find one cat by its ID,
// and delete it from the DB.
router.delete("/:id", async (request, response) => {
	let result = await Sighting.findByIdAndDelete(request.params.id).populate('user cats', '-password')

	response.json({
		deletedSighting: result
	});

});


module.exports = router;