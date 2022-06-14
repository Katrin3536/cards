import React from 'react'
import style from './Error404.module.css'

function Error404() {
    return (
        <div className={style.wrapper_error}>
            <div className={style.number}>404</div>
            <div className={style.page}>Page not found!</div>
            <div className={style.picture}></div>
        </div>
    )
}

export default Error404
