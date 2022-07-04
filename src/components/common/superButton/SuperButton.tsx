import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './SuperButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? style.red : style.default} ${className}`;

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    );
};

export default SuperButton;
