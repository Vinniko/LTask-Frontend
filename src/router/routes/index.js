export default [
  {
    path: '/',
    name: 'template',
    component: () => import(/* webpackChunkName: "template" */ '@/components/TemplateComponent'),
    children: [
          {
              path: '/',
              name: 'tasks',
              component: () => import(/* webpackChunkName: "template" */ '@/components/Tasks/TasksComponent'),
          },
          {
                path: 'task/create',
                name: 'task',
                component: () => import(/* webpackChunkName: "template" */ '@/components/Tasks/TaskComponent'),
          },
          {
              path: 'task/:id',
              name: 'task',
              component: () => import(/* webpackChunkName: "template" */ '@/components/Tasks/TaskComponent'),
          }
    ]
  },
];
