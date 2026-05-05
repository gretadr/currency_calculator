import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

import AdminView from "../views/AdminView.vue";
import ConverterView from "../views/ConverterView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

// DEfine application routes
const routes = [
    {path: "/", name: "home", component: HomeView}, 
    {path: "/converter", name: "converter", component: ConverterView},
    {path: "/login", name: "login", component: LoginView},
    {path: "/admin", name: "admin", component: AdminView, meta: { requiresAuth: true }},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//Check if token exists and is not expired
function isTokenValid () {
    const token = localStorage.getItem("token");
    if (!token) return false ;

    try {
        const decoded = jwtDecode(token);

        if(decoded.exp*1000 < Date.now()) {
            localStorage.removeItem("token");
            return false;
        }

        return true;
    } catch {
        localStorage.removeItem("token");
        return false;
    }
}


// Navigation guard. Protecting routes and prevent loggedin users from accessing login
router.beforeEach((to, from) => {
    const valid = isTokenValid();

    if (to.meta.requiresAuth && !valid) {
       return { name: "login" };
    }

    if (to.name === "login" && valid) {
        return { name: "admin"};
    }
});

export default router;