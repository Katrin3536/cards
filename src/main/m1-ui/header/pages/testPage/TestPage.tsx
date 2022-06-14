import React from 'react';
import style from './TestPage.module.css';
import SuperCheckbox from '../../../../common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from '../../../../common/c2-SuperButton/SuperButton';
import SuperInputText from '../../../../common/c1-SuperInputText/SuperInputText';

function TestPage() {
    return (
        <div className={style.testPage}>
            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton>Click</SuperButton>
        </div>
    );
}

export default TestPage;