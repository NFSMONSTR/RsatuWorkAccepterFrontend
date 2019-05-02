import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
// import Register from '@/components/Register'
import store from '../store'
import Profile from '@/components/Profile'
import UsersList from '@/components/UsersList'
import Admin from '@/components/Admin'
import WorksList from '@/components/WorksList'
import AddWork from '@/components/AddWork'
import Work from '@/components/Work'
import AttachmentsList from '@/components/AttachmentsList'
import AddAttachment from '@/components/AddAttachment'

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

const ifTutor = (to, from, next) => {
  if (store.getters.isLoggedIn && store.getters.user.permission_level >= 5) {
    next()
    return
  }
  next('/login')
}
const ifAdmin = (to, from, next) => {
  if (store.getters.isLoggedIn && store.getters.user.permission_level >= 10) {
    next()
    return
  }
  next('/login')
}

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'works_list'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    /*
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: ifNotAuthenticated
    },
    */
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
    },
    {
      path: '/work/',
      name: 'works_list',
      component: WorksList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/work/:id',
      name: 'work',
      component: Work,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: '/attachments/',
      name: 'attachments_list',
      component: AttachmentsList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/add_attachment',
      name: 'add_attachment',
      component: AddAttachment,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: ifAdmin
    },
    {
      path: '/add_work',
      name: 'add_work',
      component: AddWork,
      beforeEnter: ifTutor
    }
  ]
})

export default router
