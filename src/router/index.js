import { createRouter,createWebHistory } from "vue-router";

import Home from '@/pages/Home'
import News from '@/pages/News'
import About from '@/pages/About'
import Biography from '@/pages/Biography'
import Download from '@/pages/Download'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta:{title:"YanLin official website"}
        },
        {
            path: '/news',
            name: 'News',
            component: News,
            meta:{title:"News | YanLinn"}
        },
        {
            path: '/about',
            name: 'About',
            component: About,
            meta:{title:"About | YanLinn"}
        },
        {
            path: '/biography',
            name: 'Biography',
            component: Biography,
            meta:{title:"Biography | YanLinn"}
        },
        {
            path: '/download',
            name: 'Download',
            component: Download,
            meta:{title:"Download | YanLinn"},
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta:{title:"Contact | YanLinn"}
        },
        {
            path: '/404',
            name: 'NotFound',
            component: NotFound,
            meta:{title:"404 Not Found | YanLinn"}
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/404'
        }
    ]
})
//全局后置守卫
router.afterEach((to,from) => {
    document.title = to.meta.title || '404 Not Found';
})

export default router