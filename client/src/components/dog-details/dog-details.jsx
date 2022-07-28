import { useDispatch, useSelector } from 'react-redux';
import { getClean, getDogId } from '../../redux/actions/dogs';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import s from './dog-details.module.css';
import Nav from '../nav/nav';


const DogsDetails = () => {
    
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dog);
    let { id } = useParams();
   /* var h = [' ',' '];
    {dog.height && dog.height.length>0 ? (h = dog.height.split(' - '), ()=>{return(<a></a>)} ) : <a>.</a>}*/

    useEffect(() => {
        dispatch(getClean());
        dispatch(getDogId(id));

    }, [dispatch, id]);

    function imgStyle(img)  {
        return {
        backgroundImage:
          `url(${img})`,
        }
    };

    return (
        <div>
            <Nav/>
            <div className={s.grid}>
                                <div className={s.card}>
                                    <div className={s.box} style={imgStyle(dog.image)}></div>
                                    <a className={s.name} >{dog.name} </a>
                                    
                                    <div className={s.info}>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Height:</a>
                                            <a className={s.dato}>{dog.height}</a>
                                        </div>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Weight:</a>
                                            <a className={s.dato}>{dog.weight}</a>
                                        </div>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Years of life:</a>
                                            <a className={s.dato}>{dog.years}</a>
                                        </div>
                                        <br/>
                                        <br/>
                                        
                                        <div className={s.infoBox}>
                                            <a className={s.title}>Temperaments:</a>
                                        </div>
                                        <div className={s.gridH}>
                                            {dog.temperaments && dog.temperaments.length > 0 ? ( dog.temperaments.map((t) => {
                                                return(
                                                    <div className={s.hashtag}>
                                                        <p className={s.temperament}>{t.name}</p>
                                                    </div>
                                                )
                                            })):
                                            <h2></h2>
                                            }
                                        </div>
                                    </div>       
                                </div>
            </div>
        </div>
        
    );
}

export default DogsDetails;