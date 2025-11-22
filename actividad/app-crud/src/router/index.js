import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ProductoView from '@/views/ProductoView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/productos'
      },
      {
        path: '/productos',
        name: 'Productos',
        component: ProductoView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Guard de navegación
router.beforeEach((to, from, next) => {
  const logueado = localStorage.getItem('logueado') === 'true';

  if (to.meta.requiresAuth && !logueado) {
    next('/');
  } else if (to.meta.requiresGuest && logueado) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;