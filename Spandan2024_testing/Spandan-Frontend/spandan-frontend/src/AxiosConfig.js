import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:8000/api"
});

instance.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
}
);

instance.interceptors.response.use(response => {
    return response;
},
    error => {
        return Promise.reject(error);
    }
);

instance.defaults.headers.common["Content-Type"] = "application/json";

const token = localStorage.getItem('jwt');
// console.log(token);

if (token) {
    instance.defaults.headers.common.Authorization = "Bearer " + token;
}
export default instance;