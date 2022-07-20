import React from 'react';
import s from './pagination.module.css'


const Pagination = ({dogsPerPage, totalDogs, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav className= {s.container}>
            <ul className={s.ul}>
                {pageNumbers.map(number => (
                    <li key={number} className={s.li}>

                        <b>
                            <a className={s.number} onClick= {() => paginate(number)}>
                                {number}
                            </a>
                        </b>
                    </li>
                ))}
            </ul> 
        </nav>
    )
};

export default Pagination;