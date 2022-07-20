import React, {useState, useEffect } from 'react';
import { HelpGet } from '../helper/helper';
import { postDog} from "../../redux/actions/dogs"
import { useDispatch } from 'react-redux';
import Nav from '../nav/nav';
import s from './add-dog.module.css';

const AddDog= () => {
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);
    const [dogs, setDogs] = useState([]);
    const [temperaments, setTemperaments] = useState([]);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const[breed, setBreed] = useState({
        name:'',
        image:'',
        maxWeight:'',
        minWeight: '',
        maxHeight:'',
        minHeight:'',
        years:'',
        temperaments:[]
    })    
    
    useEffect(() => {

        const getTemperaments = async () => {
            HelpGet(`/temperaments`).then((res) => {
                setLoading(true);
                setTemperaments(res.data);
                setLoading(false);
            });
        }
        getTemperaments();
    }, []);


    function handleChange(e) {
        setBreed(() => {
          return {
            ...breed,
            [e.target.name]: e.target.value,
          };
        });
      }

      
    function handleSubmit(e) {
        e.preventDefault();
        if(breed.name=="" || breed.image==''|| breed.minHeight=="" || breed.maxHeight=="" || breed.maxWeight=="" || breed.minWeight=="" || breed.years==''|| selectedTemperaments.length==0){
            window.alert('COMPLETE TODOS LOS CAMPOS');
        }else{

            const get = async () => {
                HelpGet(`/dogs/?name=${breed.name}`).then((res) => {
                    setLoading(true);
                    setDogs(res.data);
                    setLoading(false);
                });
            }
            get();
            
            if(dogs){
                window.alert("Ya existe una raza con ese nombre");

            }else{

                if(breed.minHeight<=0 || breed.maxHeight<=0 || breed.maxWeight<=0 || breed.minWeight<=0 || breed.years<=0){
                    window.alert("Datos no validos");
                }else{
    
                    if(breed.minHeight > breed.maxHeight || breed.minWeight > breed.maxWeight){
                        window.alert("Datos no validos. Valores minimos mayores a los maximos")
                    }else{
    
                        
    
                        const addBreed = {
                            name: breed.name,
                            image: breed.image,
                            height: breed.minHeight + " - " + breed.maxHeight,
                            weight: breed.minWeight + " - " + breed.maxWeight,
                            years: breed.years,
                            temperaments: selectedTemperaments
                        }
            
                        dispatch(postDog(addBreed));
                        window.alert("breed agregada");
    
                        let bred = {
                            name:'',
                            image:'',
                            maxWeight:'',
                            minWeight: '',
                            maxHeight:'',
                            minHeight:'',
                            years:'',
                            temperaments:[]
                        };
                        
                        let dog = [];

                        setBreed(bred)
                    }
                }

            }

        }
    }
    
    const deleteTemperament = (temperament) => {
        let temperaments = selectedTemperaments.filter((c) => c !== temperament);
        setSelectedTemperaments([...temperaments]);
    }

    const addTemperament = () => {
        const select = document.getElementById('temperaments');
        const text = select.options[select.selectedIndex].text;
        if(!selectedTemperaments.includes(text)){
            setSelectedTemperaments([...selectedTemperaments, text]);
        }
    }



    return(
        <div>
            <Nav/>
            <form className={s.form} onSubmit={handleSubmit}>
                <fieldset className={s.fieldset}>
                    <legend className={s.legend}>Create Breed</legend>

                        <label>Name of breed:</label>
                        <input type='text' name="name" maxlength="30" value={breed.name} onChange={(e) => handleChange(e)}/>
                            <br/>
                            <br/>
                        <label>Image (URL):</label>
                        <input type='text' name="image"value={breed.image} maxlength="250" onChange={(e) => handleChange(e)}/>
                            <br/>
                            <br/>   
                        <label>Min Weight:</label>
                        <input type='number' name="minWeight"value={breed.minWeight} onChange={(e) => handleChange(e)}/>

                        <label>Max Weight:</label>
                        <input type='number' name="maxWeight"value={breed.maxWeight} onChange={(e) => handleChange(e)}/>
                            <br/>
                            <br/>
                        <label>Min Height:</label>
                        <input type="number" name="minHeight"  value={breed.minHeight} onChange={(e) => handleChange(e)}/>
                        <label>Max Height:</label>
                        <input type="number" name="maxHeight"  value={breed.maxHeight} onChange={(e) => handleChange(e)}/>
                            <br/>
                            <br/>
                        <label>Years of life:</label>
                        <input type="number" name="years" value={breed.years} onChange={(e) => handleChange(e)}/>
                            <br/>
                            <br/>
                        <label>Temperaments</label>
                        <select name="temperaments" id="temperaments"  onChange={(e) => handleChange(e)}>
                            {temperaments.map((c) => {
                               return( <option>{c.name}</option>)
                            })}
                        </select>
                        <input type='button' value='+' onClick={addTemperament}/>
                            <br/>
                            <br/>
                        <div id='temperaments-selected'>
                            {selectedTemperaments.map((c) => {
                            return (
                                <div key={c}>
                                    <p>{c}</p>
                                    <input
                                        type="button"
                                        value="X"
                                        onClick={()=>deleteTemperament(c)}
                                    />
                                </div>
                            );
                            })}
                         </div>
                         
                         <button type="submit">ADD BREED</button>                       

                </fieldset>
            </form>
        </div>
    )
}



export default AddDog;