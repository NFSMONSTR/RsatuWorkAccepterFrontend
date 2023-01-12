import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/auth/Login'
// import Register from '@/components/Register'
import store from '../store'
import Profile from '../components/user/Profile.vue'
import UsersList from '../components/user/UsersList.vue'
import WorksList from '../components/work/WorksList.vue'
import AddWork from '../components/work/AddWork.vue'
import Work from '../components/work/Work.vue'
import AttachmentsList from '../components/attachments/AttachmentsList.vue'
import AddAttachment from '../components/attachments/AddAttachment.vue'
import AddUser from '../components/user/AddUser.vue'
import GroupsList from "../components/group/GroupsList.vue";
import AddDoneWork from "../components/done_work/AddDoneWork.vue";
import DoneWorksList from "../components/done_work/DoneWorksList.vue";
import DoneWork from "../components/done_work/DoneWork.vue";

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
      path: '/user_add/',
      name: 'add_user',
      component: AddUser,
      beforeEnter: ifAdmin
    },
    {
      path: '/users/',
      name: 'users_list',
      component: UsersList,
      beforeEnter: ifAdmin
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
      path: '/add_work',
      name: 'add_work',
      component: AddWork,
      beforeEnter: ifTutor
    },
    {
      path: '/group',
      name: 'group',
      component: GroupsList,
      beforeEnter: ifAdmin
    },
    {
      path: '/do_work',
      name: 'do_work',
      component: AddDoneWork,
      beforeEnter: ifAuthenticated,
      props: true,
    },
    {
      path: '/done_works',
      name: 'done_works',
      component: DoneWorksList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/done_work/:id',
      name: 'done_work',
      component: DoneWork,
      beforeEnter: ifAuthenticated,
      props: true,
    }
  ]
})

export default router
