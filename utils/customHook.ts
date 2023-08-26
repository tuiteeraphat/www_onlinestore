import axios from 'axios'
import { backendServerApiUrl } from './constants'
import Cookies from 'js-cookie'

const headerConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
}

export const fetchDataFromApi = async (endpoint: string) => {
    const response = await axios.get(
        `${backendServerApiUrl}${endpoint}`,
        headerConfig
    )
    return response
}

export const fetchDataToApi = async (endpoint: string, body: object) => {
    const response = await axios.post(
        `${backendServerApiUrl}${endpoint}`,
        body,
        headerConfig
    )
    return response
}

export const customAxios = axios.create({
    baseURL: backendServerApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
    },
    withCredentials: true,
})
