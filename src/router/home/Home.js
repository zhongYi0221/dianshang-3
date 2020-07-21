export default {
    path: '/home',
    name: 'home',
    component: () => import("../../components/home/Home"),
    children:[{path:'/welcom', component:()=> import('../../components/Welcome/welcom')},
         {path:'/users',component:()=>import('../../components/User/Users')},
        {path:'/rights',component:()=>import('../../components/power/Rights')},
        {path:'/roles',component:()=>import('../../components/power/roles')}
    ],
    // redirect:'/welcom'：当在home组件时候去掉home组件地址自动定位到welcom组件
    redirect:'/welcom',
}