import { defineConfig } from '@umijs/max';
import { routes } from './route.config'

export default defineConfig({
  antd: {
    dark: true,
    compact: true,
    configProvider: {}
  },
  // theme: {
  //   '@primary-color': '#1DA57A'
  // },
  routes,
  access: {},
  model: {},
  initialState: {},
  request: {},
  mfsu: {
    esbuild: true,
  },
  layout: {
    // title: 'x-blog',
    // locale: true
  },
  // locale: {
  //   // default zh-CN
  //   // default: 'zh-CN',
  //   // antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   // baseNavigator: true,
  // },
  locale: false,
  npmClient: 'pnpm',
});

