const express = require("express");
const router = express.Router();
const cityModel = require("../model/cityModel");
require("../model/itineraryModel");

/*get all cities*/
router.get("/all", (req, res) => {
    cityModel
        .find({})
        .then(cities => {
            res.send(cities);
        })
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const {name, country, img} = req.body;

    cityModel.find({name: {"$regex": name, "$options": "i"}})
        .then(result => {
            if (result.length > 0) {
                res.status(409).send(`City '${name}' already exists`);
            } else {
                const newCity = new cityModel({
                    name: name,
                    country: country,
                    img: img,
                });

                newCity.save()
                    .then(city => {
                        res.send(city)
                    })
                    .catch(err => {
                        res.status(500).send("Server error " + err)
                    })
            }
        })
        .catch(err => console.log(err));
});

router.get('/:name',
    (req, res) => {
        let cityRequested = req.params.name;
        cityModel.findOne({name: cityRequested})
            .then(city => {
                res.send(city)
            })
            .catch(err => console.log(err));
    }
);

router.get('/:cityId/itineraries',
    (req, res) => {
        let cityRequested = req.params.cityId;

        cityModel.findById(cityRequested)
            .populate('itineraries')
            .then(itineraries => {
                res.send(itineraries)
            })
            .catch(err => console.log(err));
    }
);

module.exports = router;