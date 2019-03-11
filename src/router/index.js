import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import DevMenu from '@/components/DevMenu'
import store from '../store'
import Profile from '@/components/Profile'
import UsersList from '@/components/UsersList'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/login')
}

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: DevMenu,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: '/users/',
      name: 'users_list',
      component: UsersList,
      beforeEnter: ifAuthenticated
    }
  ]
})

export default router
