import React, {useEffect} from 'react';
import {CardsTable} from './cardsTable/CardsTable';
import style from './CardsList.module.css'
import {useAppDispatch} from '../../bll/store';
import {getCardsListTC} from '../../bll/reducers/cards-reducer';

export const CardsList: React.FC = () => {
//     const dispatch = useAppDispatch()
// useEffect(()=>{
//     dispatch(getCardsListTC())
// },[])
    return (
        <div className={style.main}><CardsTable/></div>
    );
};

// ==== TYPES ====
