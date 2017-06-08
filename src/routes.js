import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Feed from './pages/Feed.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/feed', component: Feed },
];

export const router = new VueRouter({
    routes
});