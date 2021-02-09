import { BasicLayout } from '@/layouts'

const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('../views/home')
      }
    ]
  }
]

export default routes
