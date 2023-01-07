import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMobile, setWechatUserId } from '../redux/result_reducer'
import { checkIfUserExistInMongoDB } from '../helper/helper'
import { APP_TITLE } from '../helper/consts';
import '../styles/Main.css'

const EMPTY = '';
const ID_USED = 'Sorry, mobile or wechat id already used';
const PROCEED_WITH_QUESTIOINNAIRE = 'go';

export default function Main() {
    const navigate = useNavigate();
    const [mobileValue, setMobileValue] = useState('');
    const [wechatValue, setWechatValue] = useState('');
    const [message, setMessage] = useState('');
    const mobileInputRef = useRef(null);
    const wechatInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleMobileInputChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        (result.length <= 11) && setMobileValue(result);
    }

    const handleWechatInputChange = event => {
        const result = event.target.value.replace(/[^0-9A-Za-z-]/g,"");
        (result.length <= 20) && setWechatValue(result);
    }

    const startQuiz = async () => {
        const mobile = mobileInputRef.current?.value;
        const wechatId = wechatInputRef.current?.value;
        alert('check user exists');
        const res = await checkIfUserExistInMongoDB(wechatId, mobile);
        if (Array.isArray(res) && res.length > 0) {
            const { mobile: respMobile, wechatUsername } = res && res.length && res[0];
            if (respMobile || wechatUsername) {
                setMessage(ID_USED);
            }
            alert('exists!');
        }
       else {
            if(mobileInputRef.current?.value){
                dispatch(setMobile(mobile))
            }
            if (wechatInputRef.current?.value) {
                dispatch(setWechatUserId(wechatId))
            }
            setMessage(PROCEED_WITH_QUESTIOINNAIRE);
            console.log('not exist, go to quiz!');
            navigate('/quiz');
        }
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>{APP_TITLE}</h1>
        <h2 className='title text-light'>{message}</h2>
        <form id="form">
            <input ref={mobileInputRef} className="userid" type="text" placeholder='Enter your Mobile #' onChange={handleMobileInputChange} value={mobileValue} />
        </form>

        <form id="form">
            <input ref={wechatInputRef} className="userid" type="text" placeholder='Enter your Wechat ID' onChange={handleWechatInputChange} value={wechatValue} />
        </form>

        <div className='start'>
            {(message === EMPTY || ID_USED) && <button className='btn' onClick={startQuiz}>Start Questionnaire</button>}
        </div>
    </div>
  )
}
