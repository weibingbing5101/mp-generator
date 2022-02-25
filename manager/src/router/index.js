import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/page/Page.vue'
import PageAdd from '../views/page/add/PageAdd.vue';
import Floor from '../views/floor/Floor.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/page',
    name: 'Page',
    component: Page
  },
  {
    path: '/page/add',
    name: 'PageAdd',
    component: PageAdd
  },
  {
    path: '/floor',
    name: 'Floor',
    component: Floor
  },
  {
    path: '/ci',
    name: 'Ci',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/ci/Ci.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router