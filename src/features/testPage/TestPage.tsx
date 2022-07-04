import React from 'react';
import style from './TestPage.module.css';
import SuperCheckbox from '../../components/common/superCheckbox/SuperCheckbox';
import SuperButton from '../../components/common/superButton/SuperButton';
import SuperInputText from '../../components/common/superInputText/SuperInputText';

const TestPage: React.FC=()=> {
    return (
        <div className={style.testPage}>
            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton>Click</SuperButton>
        </div>
    );
}

export default TestPage;