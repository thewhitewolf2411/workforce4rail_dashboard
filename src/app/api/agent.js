import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})

api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        return Promise.reject()
    }

    return Promise.reject(error)
})

const responseBody = response => response.data;

const requests = {
    get: (url) => api.get(url).then(responseBody),
    post: (url, body) => api.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        api.defaults.headers.common['X-XSRF-TOKEN'] = response.config.headers['X-XSRF-TOKEN'];
        axios.post(url, body, {xsrfHeaderName: "X-XSRF-TOKEN", withCredentials: true}).then(responseBody)}),
    put: (url, body) => api.put(url, body).then(responseBody),
    del: (url) => api.delete(url).then(responseBody),
}

const Account = {
    login: (user) => 
        requests.post('http://localhost:8000/login', user).then(response => {
        if(response.data.error){
            alert(response.data.error);
        } else {
            console.log('success');
        }
    }),
    logout: (user) => requests.post('http://localhost:8000/logout', user),
}

const agent = {
    Account,
}


export default agent;