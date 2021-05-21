import Axios from 'axios'

export function request01(config) {
    const axios = Axios.create({
        baseURL:'http://jsonplaceholder.typicode.com',
        timeout:5000,
    });
    return axios(config)
}

export function request02(config) {
    const  axios = Axios.create({
        baseURL:'http://127.0.0.1:8000/be',
        // baseURL:'http://netpm.yunshanmeicai.com/be',
        timeout:8000,
    });
    return axios(config)
}
