import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import FromMain from '../components/FromMain.vue'
import CreateProfile from '../components/CreateProfile.vue'
import FormMain2 from '../components/FormMain2.vue'

const routes = [
  { path: '/', name: 'Home', component: FormMain2 },
  { path: '/create-post', name: 'CreatePost', component: FromMain },
  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/register', name: 'Register', component: () => import('../components/RegisterForm.vue') },
  { path: '/forgot-password', name: 'ForgotPassword', component: () => import('../components/ForgotPasswordForm.vue') },
  { path: '/create-profile', name: 'CreateProfile', component: CreateProfile },
  { path: '/profile', name: 'Profile', component: () => import('../components/Profile.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Chặn truy cập nếu chưa đăng nhập
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('loggedInUser')

  // Nếu đi tới create-post mà chưa đăng nhập thì chuyển hướng đến login
  if (to.path === '/form-main' && !isAuthenticated) {
    alert('Bạn cần đăng nhập để đăng bài viết!')
    next('/login')
  } else {
    next()
  }
})

export default router
