import { NavLink } from 'react-router-dom';
import s from './nav.module.css';

const Nav= () => {

    const coun = () =>{
        if(window.location.href === "http://localhost:3000/home"){
          window.location.reload(true);
        }
      }

    return (
        <div className={s.container}>
          <h1 className={s.title}>DOGS APP</h1>
          <NavLink className={s.link} to="/home">
              <div className={s.box}>
                <p class='' onClick={coun}>HOME</p>
              </div>
              
          </NavLink>
    
          <NavLink className={s.link} to="/addDog">
              <div className={s.box}>
                <p class="">ADD DOG</p>  
              </div>
              
          </NavLink>
      </div>
        
    );
}

export default Nav;