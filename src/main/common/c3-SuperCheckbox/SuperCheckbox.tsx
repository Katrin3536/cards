import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = Exclude<DefaultInputPropsType, "type"> & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {  onChange, onChangeChecked,
        className = s.label, spanClassName,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
          onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <label className={s.label}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
}

export default SuperCheckbox
