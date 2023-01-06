import { useEffect } from 'react';
import { postServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    console.log(`PushAnswer - ${result}`);
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData, callback) => {
    const { result, mobile, wechatUsername } = resultData;
    useEffect(() => {
        (async () => {
            try {
                if(result !== [] && (!mobile && !wechatUsername)) throw new Error("Couldn't get Result");
                await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData, (data) => {
                    const { msg } = data;
                    if (msg === 'success') {
                        callback(data);
                    }
                    return data;
                })
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);
}