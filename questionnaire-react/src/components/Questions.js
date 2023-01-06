import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


/** Custom Hook */
import { useFetchQestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'


export default function Questions({ onChecked }) {
    const [checked, setChecked] = useState(undefined)
    const { questionIndex } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError}] = useFetchQestion();

    // get current question object from store
    const aQuestion = useSelector(state => {
        const questionIndex = state.questions.questionIndex;
        const questionsArr = state.questions.queue;
        return questionsArr[questionIndex];
    });

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateResult({ questionIndex, checked}))
    }, [checked])
    
    function onSelect(i) {
        // update parent onChecked handler so that we give the answer 'i' to the parent
        // that way the parent pushes the answer into state.result
        // parent state changes, which re-renders. Specifically, it changes state.questions (questionIndex, queue)
        onChecked(i);

        // set local checked and then dispatch to update store
        setChecked(i);
    }

    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div className='questions'>
        <h2 className='text-light'>{aQuestion?.question}</h2>
        {<ul key={aQuestion?.id}>
            {
                aQuestion?.options.map((answer, index) => (
                    <li key={index}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${index}-option`}
                            onChange={() => onSelect(index)}
                        />

                        <label className='text-primary' htmlFor={`q${index}-option`}>{answer}</label>
                        <div className={`check ${result[questionIndex] == index ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul> }
    </div>
  )
}
