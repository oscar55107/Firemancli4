import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login', 
  },
  {
    path: '/',
    name: 'Index',
    component: () => import( '../views/Index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path:'/customer_product',
    name:'CustomerProduct',
    component: () => import( '../views/CustomerProduct.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import( '../components/Dashboard.vue'),
    children:[
        { 
            path: 'products',
            name: 'Products',
            component:  () => import( '../views/Products.vue'),
            meta:{ requiresAuth: true},              
        },
        { 
            path: 'coupon',
            name: 'Coupon',
            component: () => import( '../views/Coupon.vue'),
            meta:{ requiresAuth: true},  
        },
        {
            path: 'order',
            name: 'Order',
            component: () => import( '../views/Order.vue'),
            meta:{ requiresAuth: true},  
        },
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( '../views/Cart.vue'),
  },
  {
    path: '/customer_order',
    name: 'CustomerOrder',
    component: () => import( '../views/CustomerOrder.vue'),
  },
  {
    path: '/customer_checkout/:orderId',
    name: 'CustomerCheckout',
    component: () => import( '../views/CustomerCheckout.vue'),
  },
  {
    path: '/product_detail/:productId',
    name: 'ProductDetail',
    component: () => import( '../views/ProductDetail.vue'),
},
]

const router = new VueRouter({
  routes
})

export default router
