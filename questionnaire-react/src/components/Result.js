import React, { useEffect, useState } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';

/** import actions  */
import { usePublishResult } from '../hooks/setResult';

import { APP_RESULT_THANK_YOU } from '../helper/consts';

export default function Result() {
    const { questions : { queue }, result : { result, mobile, wechatUserId }}  = useSelector(state => state)
    const [msgResult, setMsgResult] = useState('');
    usePublishResult({ 
        result, 
        mobile,
        wechatUsername: wechatUserId,   
    }, 
    (data) => {
        if (data?.msg === 'success') {
            setMsgResult(`We have received your answers! We hope you continue to enjoy Ricky's livestreams.`);
        }
    });

    return (
        <div className='container'>
            <h1 className='title text-light'>{APP_RESULT_THANK_YOU}</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <p className='bold text-light'>{wechatUserId || ""}</p>
                </div>

                <div className='flex'>
                    <p className='bold text-light'>{mobile || ""}</p>
                </div>
                <div className='flex'>
                    <span id='result'>{msgResult}</span>
                </div>
            </div>

            <div className="container">
                {/* result table */}
                {/* <ResultTable></ResultTable> */}
            </div>
        </div>
    )
}
