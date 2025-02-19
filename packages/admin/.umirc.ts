import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
    compact: true,
    configProvider: {}
  },
  theme: {
    '@primary-color': '#1DA57A'
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  mfsu: {
    esbuild: true,
  },
  layout: {
    // title: 'x-blog',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

