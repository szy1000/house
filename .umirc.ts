import { defineConfig } from "umi";

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
  title: '商业旅游项目',
  hash: true,
  routes: [
    { path: "/", component: "home" },
    { path: "/msg", component: "msg" },
    { path: "/my", component: "my" },
    { path: "/login", component: "login", layout: false },
    { path: "/register", component: "register", layout: false },
    { path: "/protocol", component: "protocol", layout: false },
    { path: "/edit", component: "edit", layout: false },
  ],
  dva: {},
  plugins: ['@umijs/plugins/dist/dva'],
  metas: [
    {
      name: 'viewport',
      content:
        'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    },
    { name: 'keywords', content: '基础框架' },
    {
      name: 'description',
      content: 'ccc',
    },
    { name: 'renderer', content: 'webkit|ie-comp|ie-stand' },
    { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge,chrome=1' },
    { 'http-equiv': 'Cache-Control', content: 'no-cache' },
    { 'http-equiv': 'Pragma', content: 'no-cache' },
    { 'http-equiv': 'Expires', content: '0' },
  ],
  links: [
    {rel: 'icon', href: '/_logo.png',},
    {rel: 'stylesheet', href: '/reset.css',},
  ],
  npmClient: 'pnpm',
});
