import React, {useState} from 'react';
import {CardsTable} from '../../components/cardsTable/CardsTable';
import style from './CardsList.module.css'


export const CardsList: React.FC = () => {

    return (
        <div className={style.main}><CardsTable/></div>
    );
};

// ==== TYPES ====
