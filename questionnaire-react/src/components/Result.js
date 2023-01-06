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
            setMsgResult(`We have received your answers! Thank you!`);
        }
    });

    return (
        <div className='container'>
            <h1 className='title text-light'>{APP_RESULT_THANK_YOU}</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Wechat User ID</span>
                    <span className='bold'>{wechatUserId || ""}</span>
                </div>

                <div className='flex'>
                    <span>Mobile #</span>
                    <span className='bold'>{mobile || ""}</span>
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
