import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'

/** check user auth  */
export function CheckUserExist({ children }){
    const mobileAuth = useSelector(state => state.result.mobile);
    const wechatAuth = useSelector(state => state.result.wechatUserId);
    console.log(`local: mobileAuth ${mobileAuth}, wechatAuth ${wechatAuth}`);

    return (mobileAuth && wechatAuth) ? children : <Navigate to={'/'} replace={true}></Navigate>
}

export async function checkIfUserExistInMongoDB(wechatUsername, mobile, callback) {
    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL

    })
    const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/user`;
    console.log('checkIfUserExistInMongoDB - wechatUsername', wechatUsername);
    console.log('checkIfUserExistInMongoDB - mobile', mobile);

    const data = await (await axiosInstance.get(url, 
    {
        params: {
            wechatUsername,
            mobile
        }
    },
    ))?.data;
    return callback ? callback(data) : data;
}
/** get server data */
export async function getServerData(url, callback) {
    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL

    })
    // second axios is to get the data resolved from json() (wait for data in body to arrive) 
    const data = await (await axiosInstance.get(url))?.data;
    return callback ? callback(data) : data;
}


/** post server data */
export async function postServerData(url, result, callback) {
    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL

    })
    // second axios is to get the data resolved from json() (wait for data in body to arrive) 
    console.log(`-- postServerData --`);
    console.log(result);
    const data = await (await axiosInstance.post(url, result))?.data;
    return callback ? callback(data) : data;
}