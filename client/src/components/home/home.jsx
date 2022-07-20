import React, {useState, useEffect } from 'react';
import DogsCards from '../dogs/dogs';
import { HelpGet } from '../helper/helper';
import Nav from '../nav/nav';
import Pagination from '../pagination/pagination';
import s from './home.module.css';

const Home = () => {
    
    const [dogs, setDogs] = useState([]);
    const [allDogs, setAllDogs] = useState([]);
    
    const [loading, setLoading] = useState(false);
   
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(9)

    const[temperaments, setTemperaments] = useState([])
    const [filter, setFilter] = useState({
        name:'',
        temperament: '',
        order:''
    });

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
                setAllDogs(res.data);
                setLoading(false);
            });
        }
        get();
     
    }, []);

    function searchChange(e) {
        let newFilter = {...filter}
        newFilter.name = e.target.value;
        setFilter(newFilter);
    }

    const searchDog = () => {
        let name = filter.name;
        const get = async () => {
            HelpGet(`/dogs/?name=${name}`).then((res) => {
                setLoading(true);
                setDogs(res.data);
                setLoading(false);
            });
        }
        get();
    }

    function temperamentChange(e) {
        let newFilter = {...filter}
        newFilter.temperament= e.target.value;
        setFilter(newFilter);

        
        let newDogs = allDogs.filter((d) => {
           let aux = d.temperaments
           return aux.some((t) => t.name == e.target.value)
        })
        setDogs(newDogs);
    }
    
    function orderChange(e) {
        let newFilter = {...filter}
        newFilter.order = e.target.value;
        setFilter(newFilter);
        
        if(e.target.value == 'desc'){
            dogs.sort(function (a, b) {
                if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                }
                return 0;
              });
        
        }else{
            if(e.target.value == 'asc'){
                dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
            
            }else{

                if(e.target.value == 'max-weight'){
                    dogs.sort(function (a, b) {
                        if (a.weight > b.weight) {
                          return 1;
                        }
                        if (a.weight < b.weight) {
                          return -1;
                        }
                        return 0;
                    });
                
                }else{

                    if(e.target.value == 'min-weight'){
                        dogs.sort(function (a, b) {
                            if (a.weight < b.weight) {
                              return 1;
                            }
                            if (a.weight > b.weight) {
                              return -1;
                            }
                            return 0;
                        });

                    }
                }
            } 
        }


    }

    const indexOfLastPost = currentPage * dogsPerPage;
    const indexOfFirstPost = indexOfLastPost - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstPost, indexOfLastPost); 

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div className={s.body}>
            <Nav/>
            <div id="search" className={s.container}>

                <div className={s.containerTemp}>
                    <label className={s.labelTemp}>Temperaments</label>
                            <select className={s.selectTemp} name="temperaments" id="temperaments" autocomplete="nope" onChange={(e) => temperamentChange(e)}>
                                {temperaments && temperaments.length > 0 ? (temperaments.map((c) => {
                                return( <option>{c.name}</option>)
                                })): <option></option>}
                            </select>
                </div>

                <div className={s.containerSearch}>
                    <input className={s.search} type="text" name="dog" id="dog" value={filter.name} onChange={(e) => searchChange(e)} />
                    <input className={s.button} type='button' value='  ' onClick={searchDog}/>
                </div>


                <div className={s.containerOrder}> 
                    <label className={s.labelOrder}>Order:</label>
                    <select className={s.selectOrder} name="order" value={filter.order} onChange={(e) => orderChange(e)}>
                        <option></option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                        <option value='max-weight'>Max Weight</option>
                        <option value='min-weight'>Min Weight</option>
                    </select>
                </div>  
            </div>
            <DogsCards dogs={currentDogs} loading={loading}/>
            <Pagination dogsPerPage={dogsPerPage} totalDogs={dogs.length} paginate={paginate}/>
        </div>
    );

};

export default Home;