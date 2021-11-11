import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { calloutRoute } from '../modules/callout/callout.route';
import { homeRoute } from '../modules/home/home.route';
import { informationRoute } from '../modules/information/information.route';
import { joinRoute } from '../modules/auth/join/join.route';
import { authRoute } from '../modules/auth/auth.route';

// routes

const routes: RouteRecordRaw[] = [
  ...calloutRoute,
  ...informationRoute,
  ...joinRoute,
  ...homeRoute,
  ...authRoute,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const isAuthPath = new RegExp('^/(auth|join)').test(to.path);

  const redirectTo = isAuthPath ? null : to.path;

  if (!isAuthenticated && !isAuthPath) {
    next({ path: '/auth/login', query: { redirectTo } });
  } else {
    next();
  }

  const newsroomName = import.meta.env.VITE_NEWSROOM_NAME as string;

  document.title = to.meta.pageTitle
    ? to.meta.pageTitle + ' - ' + newsroomName
    : newsroomName;
});

export default router;
