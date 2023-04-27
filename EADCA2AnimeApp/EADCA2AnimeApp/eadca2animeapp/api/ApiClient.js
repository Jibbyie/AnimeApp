import axios from 'axios'

const ApiClient = axios.create({
  baseURL: 'http://51.210.101.138:5000/',
  timeout: 30000
})

export default ApiClient
