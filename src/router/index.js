import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [ {
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	}, {
		path: '/comment/:id',
		name: 'Comment',
		component: () => import('../views/Comment.vue')
	}, {
		path: '/detail/:id',
		name: 'Detail',
		component: () => import('../views/Detail.vue')
	},{
		path: '/collection',
		name: 'Collection',
		component: () => import('../views/Collection.vue')
	}, {
	  path: '/mine',
	  name: 'Mine',
	  component: () => import('../views/Mine.vue')
	}, {
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	}, {
		path: '/setup',
		name: 'Setup',
		component: () => import('../views/Setup.vue')
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
