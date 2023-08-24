import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';

export const gatherApiNoToken = async (url, method, data) => {
    const body = await axios({
        url, method, data
    })
    return body.data
}

export const gatherApi = async (url, method, data) => {
    const token = localStorage.getItem('token')
    const body = await axios({
        url, method, data,
        headers: { "Authorization": `Bearer ${token}` }
    })
    return body.data
}