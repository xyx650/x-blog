import type { RunTimeLayoutConfig } from '@umijs/max'
import { getInitTheme } from '@/utils'
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  const theme = getInitTheme();
  return {
    // name: '@umijs/max',
    theme,
  };
}

export const layout: RunTimeLayoutConfig = (props) => {
  // console.log( 'props===', appData)
  // if (location.pathname === '/login') {
  //   return {
  //     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
  //     title: 'x-blog2',
  //     // 不展示顶栏
  //     headerRender: false,
  //     // 不展示页脚
  //     footerRender: false,
  //     // 不展示菜单
  //     menuRender: false,
  //     // 不展示菜单顶栏
  //     menuHeaderRender: false,
  //     // 权限配置，需要与 plugin-access 插件配合使用
  //     access: 'canRead',
  //     // 隐藏子菜单
  //     hideChildrenInMenu: true,
  //     // 隐藏自己和子菜单
  //     hideInMenu: true,
  //     // 在面包屑中隐藏
  //     hideInBreadcrumb: true,
  //     // 子项往上提，仍旧展示,
  //     flatMenu: true,
  //     locale: 'en-US'
  //   }
  // }
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: 'x-blog',
    menu: {
      // locale: true,
    },
    // locale: 'en-US'
  };
};
