import axios from "axios"
import {API_PATHS} from '../configs/api.config.ts'

export const getRegion = async() => {
    try {
        const results = await axios.get(API_PATHS.location)
        return results.data
    } catch (error) {
        return []
    }
}

export const getState = async(id: number) => {
    try {
        const results = await axios.get(`${API_PATHS.location}?pid=${id}`)
        return results.data
    } catch (error) {
        return []
    }
}