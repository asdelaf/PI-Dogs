const { Router } = require("express");
const router = Router();
const { Dog, Temperament } = require('../db.js');
const axios = require("axios");
const URL_API = "https://api.thedogapi.com/v1/breeds";

router.get("/", async(req, res, next) => {
    const {name} = req.query;
    try{
        if(name){
            let nam = name.toUpperCase();
            const dogsBase = await Dog.findAll({where: {name: nam}, include: [{model: Temperament}]})
            if(dogsBase.length>0){
                res.json(dogsBase)
            }else{
                const data = await axios.get(URL_API);
                const dataApi = data.data;
                const dogsApi = dataApi.filter((c) => {
                    return c.name.toUpperCase() === nam
                })
    
                const dogApi = dogsApi.map((c) => {
                    let temp =[];
                    let aux = [];
                    if(c.temperament){
                        aux = c.temperament.split(', ');
                        aux.map((a) => {
                            let t = {name: a}
                            temp.push(t);                        
                        })                          
                    }
                    return {
                        id: 'a'+ c.id.toString(),
                        weight: c.weight.metric,
                        height: c.height.metric,
                        name: c.name.toUpperCase(),
                        image: c.image.url,
                        years: c.life_span,
                        temperaments: temp 
                                       
                    } 
                })

                res.json(dogApi);

            }        
            
            

        }else{

            const dogs = await Dog.findAll({include: [{model: Temperament}]})

            const data = await axios.get(URL_API);
            const dataa = data.data;
            const dataApi = dataa.map((c) => {   
                let temp =[];
                let aux = [];
                if(c.temperament){
                    aux = c.temperament.split(', ');
                    aux.map((a) => {
                        let t = {name: a}
                        temp.push(t);                        
                    })                                   
                }
                return {
                    id: 'a'+ c.id.toString(),
                    weight: c.weight.metric,
                    height: c.height.metric,
                    name: c.name.toUpperCase(),
                    image: c.image.url,
                    years: c.life_span,
                    temperaments: temp                       
                } 
            })
            
            res.json(dataApi.concat(dogs))
        }    
        
    } catch(error) {
        next(error)
    }
    
});

router.get("/:id", async(req, res, next) => {
    const {id} = req.params;

    try{
        if(id.length>30){
            const dog = await Dog.findByPk(id, {include: [{model: Temperament}]});
            res.json(dog);
        }else{
            const data = await axios.get(URL_API);
            const dataApi = data.data;
            const dogsApi = dataApi.map((c) => {
                let temp =[];
                let aux = [];
                if(c.temperament){
                    aux = c.temperament.split(', ');
                    aux.map((a) => {
                        let t = {name: a}
                        temp.push(t);                        
                    })                          
                }
                return {
                    id: 'a'+ c.id.toString(),
                    weight: c.weight.metric,
                    height: c.height.metric,
                    name: c.name,
                    image: c.image.url,
                    years: c.life_span,
                    temperaments: temp 
                                   
                } 
            })

            const dogApi = dogsApi.find((d) => d.id === id)
            res.json(dogApi);
        }

    } catch(error){
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    const {name, image, height, weight, years, temperaments} = req.body;

    try {
        const new_dog = await Dog.create({
            name: name.toUpperCase(),
            image: image,
            height: height,
            weight: weight,
            years: years
        });
        const t = await Temperament.findAll({where: {name: temperaments}});
        await new_dog.addTemperament(t)
        res.json({msg: "paso"}) 

    } catch (error) {
        next(error)
    }
});

module.exports = router;