import axios from "axios";

const developmentURL = "http://127.0.0.1:5000"
const productionURL = "http://65.2.121.107"

axios.defaults.baseURL = developmentURL


// axios.interceptors.request.use(function (req) {
//     const user = localStorage.getItem('user');
//     if (user) {
//       const { token } = JSON.parse(localStorage.getItem('user'));
//       req.headers.authorization = `Bearer ${token}`;
//       return req;
//     }
//     return req;
// });