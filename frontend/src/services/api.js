import axios from "axios";

//Create axios instance with base URL
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

//Automatically attach JWT token to every request
instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
    
);

//Handle invalid or expired tokens
instance.interceptors.response.use(
    function (response) {
        return response;
    }, 

    function (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem("token");
            // window.location.href = "/login";

            //Redirect only if on protected page
            const publicPaths = ["/", "/login", "/converter"];
            if (!publicPaths.includes(window.location.pathname)) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }

);

//Auth endpoint
export const login = async (username, password) => {
    const response = await instance.post("/auth/login", {username, password});
    return response.data ;
}

//Currency endpoints
export const getRates = async () => {
    const response = await instance.get("/currencies");
    return response.data;
}

export const getRate = async (id) => {
    const response = await instance.get(`/currencies/${id}`);
    return response.data;
}

export const createRate = async (from, to, rate) => {
    const response = await instance.post("/currencies", { from_currency: from, to_currency: to, rate});
    return response.data;
}

export const updateRate =  async (id, rate) => {
    const response = await instance.patch(`/currencies/${id}`, {rate});
    return response.data;
}

export const deleteRate =  async (id) => {
    const response = await instance.delete(`/currencies/${id}`);
    return response.data;
}

//Convert endpoint
export const convertCurrency = async (from, to, amount) => {
    // const response = await instance.get(`/convert?from=${from}&to=${to}&amount=${amount}`);
    const response = await instance.get("/convert", { params: { from, to, amount } });
    return response.data;
}

export default instance;

