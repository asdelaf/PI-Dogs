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

        const get = async () => {
            HelpGet(`/dogs`).then((res) => {
                setLoading(true);
                setDogs(res.data);
                setLoading(false);
            });
        }
        get();
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
        if(breed.name ==="" || breed.image ===''|| breed.minHeight ==="" || breed.maxHeight ==="" || breed.maxWeight ==="" 
        || breed.minWeight ==="" || breed.years ===''|| selectedTemperaments.length ===0){
            window.alert('COMPLETE TODOS LOS CAMPOS');
        }else{


            
            if(dogs.find((d) => d.name === breed.name.toUpperCase())){
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

                        setSelectedTemperaments(bred.temperaments);
                        setBreed(bred);
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
                <h1 className={s.title}>Create Breed</h1>
                <fieldset>
                        <div className={s.containerText}>
                            <label className={s.labelTitle}>Name of breed:</label>
                            <input className={s.input} type='text' name="name" maxlength="30" value={breed.name} onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerText}>
                            <label className={s.labelTitle}>Image (URL):</label>
                            <input className={s.input} type='text' name="image" value={breed.image} maxlength="250" onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerMin}>   
                            <label className={s.labelTitle}>Min Weight:</label>
                            <input className={s.input} type='number' name="minWeight" value={breed.minWeight} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div className={s.containerMax}> 
                            <label className={s.labelTitle}>Max Weight:</label>
                            <input className={s.input} type='number' name="maxWeight" value={breed.maxWeight} onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerMin}> 
                            <label className={s.labelTitle}>Min Height:</label>
                            <input className={s.input} type="number" name="minHeight"  value={breed.minHeight} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div className={s.containerMax}> 
                            <label className={s.labelTitle}>Max Height:</label>
                            <input className={s.input} type="number" name="maxHeight"  value={breed.maxHeight} onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerYears}> 
                            <label className={s.labelTitle}>Years of life:</label>
                            <input className={s.input} type="number" name="years" value={breed.years} onChange={(e) => handleChange(e)}/>
                        </div>

                        <br/>
                        <br/>

                        <div className={s.containerTemperaments}> 
                            <label className={s.labelTitle}>Temperaments:</label>
                            <br/>
                            <div className={s.divSelect}>
                                <div className={s.containerSelect}> 
                                    <select name="temperaments" id="temperaments"  onChange={(e) => handleChange(e)}>
                                        {temperaments.map((c) => {
                                        return( <option>{c.name}</option>)
                                        })}
                                    </select>
                                </div>
                                <input className={s.addTemperament} type='button' value='+' onClick={addTemperament}/>
                            </div>     
                        </div>

                        <div classname={s.grid} id='temperaments-selected'>
                            {selectedTemperaments.map((c) => {
                            return (
                                <div className={s.hashtag} key={c}>
                                    <p className={s.temperament}>{c}</p>
                                    <input
                                        className={s.buttonDelete}
                                        type="button"
                                        value="X"
                                        onClick={()=>deleteTemperament(c)}
                                    />
                                </div>
                            );
                            })}
                         </div>
                         
                         <button className={s.buttonSubmit}type="submit">ADD BREED</button>                       

                </fieldset>
            </form>
        </div>
    )
}



export default AddDog;