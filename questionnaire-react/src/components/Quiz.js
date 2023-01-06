import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

import { APP_TITLE } from '../helper/consts';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {
    // this is used to contain the radio selected answer index
    const [checkedIndex, setCheckedIndex] = useState(undefined)

    // result is an array that holds all the user answers thus far
    const result = useSelector(state => state.result.result);

    const { queue, questionIndex } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    function onNext() {
        if(questionIndex < queue.length){
            // increase the trace value by one using MoveNextAction 
            dispatch(MoveNextQuestion());

            // as long as our result is less than index of all questions, we can push the newly user result onto it.
            if(result.length <= questionIndex) {
                dispatch(PushAnswer(checkedIndex));
            }
        }
        setCheckedIndex(undefined)
    }

    function onPrev() {
        if(questionIndex > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(index) {
        setCheckedIndex(index); // state changes, re-renders component
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

  return (
    <div className='container'>
        <h1 className='title text-light' data-testid="title">{APP_TITLE}</h1>
        <h2 className='text-light'>Question # {questionIndex+1} </h2>
        {/* child updates checkedIndex so that when we click onNext, it will push it onto the state.result [] */}
        <Questions onChecked={onChecked} />
        <p className={checkedIndex !== undefined ? 'text-light' : 'warning'}>{checkedIndex !== undefined ? `You selected answer ${checkedIndex+1}` : 'Please select a choice'}</p>
        <div className='grid'>
            {/* { questionIndex > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>} */}
            <button data-testid="nextBtn" className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}
