import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Dogshow from '../components/Dogshow.vue';

const routes = [
    {
        path: '/',
		name: 'Home',
		component: Home
    },
    {
        path: '/dogshow',
		name: 'dogshow',
		component: Dogshow
    }
]



const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});
export default router;

