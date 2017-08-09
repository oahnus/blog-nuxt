/**
 * Created by hasee on 2017/8/1.
 */
import axios from 'axios'
import Vue from 'vue'
import apiConfig from '../api.config'

const Api = axios.create({
  baseURL: apiConfig.baseUrl
})

Vue.prototype.$http = axios
export default Api
