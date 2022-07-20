const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require('../db.js');
const axios = require("axios");
const URL_API = "https://api.thedogapi.com/v1/breeds";

router.get("/", async(req, res, next) => {
    try{
        const temperaments = await Temperament.findAll({ order: [["name", "ASC"]]});
        res.json(temperaments)
        
    } catch(error) {
        console.log(error)
    }
    
});

router.post("/", async (req, res, next) => {
    const {name} = req.body;

    try {   
            const temperaments = await Temperament.findAll();
            if(name){
                const new_temperament = await Temperament.create({
                    name: name
                });
                res.json({msg: "paso"});
            }else{
                
                if(temperaments.length == 0){
                    let aux = [];
                    let a;
                    const data = await axios.get(URL_API);
                    const dataa = data.data;
                    dataa.map((c) => {
                        if(c.temperament){
                            a = c.temperament.split(', ')
                            aux = aux.concat(a);
                               
                        }
                    })
                   
                    aux = Array.from(new Set(aux)); //elimina repetidos
                    const temp = await aux.map((c) => {
                         Temperament.create({name: c})
                    });
    
                    res.json("pasaron");
                
                }else{
                    res.json("ingrese un name")

                }

            }


    } catch (error) {
        next(error)
    }
});

module.exports = router;