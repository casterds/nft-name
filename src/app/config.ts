import axios from "axios"

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

export const axiosInstance = axios.create({baseURL: 'https://nft-api-v2.top1st.org'})
