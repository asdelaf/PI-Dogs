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
            {dogs.map((c) => {
                    return (
                        <NavLink className={s.link} to={`/dogs/${c.id}`}>
                            <div className={s.card}>
                                <div className={s.box} style={imgStyle(c.image)}></div>
                                <a className={s.name} >{c.name} </a>
                                <div className={s.gridH}>
                                    {c.temperaments.map((t) => {
                                        return(
                                            <div className={s.hashtag}>
                                                <p className={s.temperament}>{t.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>                         
                            </div>
                        </NavLink> 
                    )
            })}
        </div>

        
    );
}

export default DogsCards;