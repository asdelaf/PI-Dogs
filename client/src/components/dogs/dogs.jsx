import { NavLink } from 'react-router-dom';
import s from './dogs.module.css';

const DogsCards = ({dogs, loading}) => {

    if(loading){
        return <h2>Loading...</h2>
    }

    function imgStyle(img)  {
        return {
        backgroundImage:
          `url(${img})`,
        }
      };

    return (
        <div className={s.grid}>
            {dogs && dogs.length > 0 ? (dogs.map((c) => {
                    return (
                        
                            <div className={s.card}>
                                <NavLink className={s.link} to={`/dogs/${c.id}`}>
                                <div>
                                <div className={s.box} style={imgStyle(c.image)}></div>
                                <a className={s.name} >{c.name} </a>
                                <div className={s.gridH}>
                                    {c.temperaments && c.temperaments.length ? (c.temperaments.map((t) => {
                                        return(
                                            <div className={s.hashtag}>
                                                <p className={s.temperament}>{t.name}</p>
                                            </div>
                                        )
                                    })):<h2></h2>}
                                </div>
                                </div>
                                </NavLink>                          
                            </div>
                        
                    )
            })): <h2></h2>}
        </div>

        
    );
}

export default DogsCards;