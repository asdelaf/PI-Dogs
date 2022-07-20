import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { postTemperament } from '../../redux/actions/temperaments';
import { useDispatch } from 'react-redux';
import s from './landing-page.module.css';


const LandingPage= () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(postTemperament())
    },[])



    return (
        <div className={s.container}>
            <h1 className={s.title}>DOGS APP</h1>
            <NavLink className={s.link} to="/home">
                <div className={s.card}>
                    <div  className={s.img}>
                        <span className={s.name}>
                            START
                        </span>
                    </div>
                </div>
            </NavLink>

        </div>
        
    );
}

export default LandingPage;