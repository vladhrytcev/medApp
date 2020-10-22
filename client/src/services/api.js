import axios from 'axios';
import fromPairs from 'lodash/fromPairs';


const URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

const API_URL = process.env.NODE_ENV === 'development' ? `${URL}:${API_PORT}/api` : `${process.env.REACT_APP_API_SHORTURL}`;



axios.defaults.baseURL = API_URL;


const methods = ['get', 'post', 'put', 'delete', 'patch'];

const api = fromPairs(methods.map(method => [
    method,
    (url, payload = {}, headers = {}) => {
        const config = {
            url,
            method,
            headers,
        };
        
        if (method === 'get') {
            config.params = payload;
        } else {
            config.data = payload;
        }

        const tokens = JSON.parse(localStorage.getItem('redux')).local.userAccess.access_token;

        if (!!tokens) {
            config.headers.Authorization = `${tokens.tokenType || 'Bearer'} ${tokens}`;
        }

        return axios(config)
            .then((response) => {
                const { data, status, statusText } = response;

                return {
                    data,
                    status,
                    statusText,
                };
            })
            .catch((error) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('API Error: ', error);
                }
                return Promise.resolve({ error });
            });
    },
]));

export default api;
