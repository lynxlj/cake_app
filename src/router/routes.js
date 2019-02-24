const Home = () => import('@/pages/Home');
const Mall = () => import('@/pages/Mall');
const Cart = () => import('@/pages/Cart');
const Mine = () => import('@/pages/Mine');
const Recommend = () => import('@/components/Home/Recommend');
const HomeDetail = () => import('@/components/Home/HomeDetail');
const CategoryList = () => import('@/pages/CategoryList');
const BrandList = () => import('@/pages/BrandList');
const ProList = () => import('@/pages/ProList');
const Detail = () => import('@/pages/Detail');
const Brand = () => import('@/pages/Brand');
const Cate = () => import('@/pages/Cate');
const Logout = () => import('@/pages/Logout');
const Search = () => import('@/pages/Search');

export default [{
  path: '/',
  redirect: '/home/recommend',
}, {
  path: '/home',
  text: '首页',
  component: Home,
  isTabbar: true,
  icon: 'home',
  children: [{
    path: 'recommend',
    name: 'recommend',
    component: Recommend,
  }, {
    path: 'detail/:id',
    name: 'detail',
    component: HomeDetail,
  }, {
    path: '/',
    redirect: '/home/recommend',
  },
  ],
}, {
  path: '/mall',
  name: 'mall',
  text: '分类',
  component: Mall,
  isTabbar: true,
  icon: 'mall',
  redirect: '/mall/category',
  children: [
    {
      path: 'category',
      component: Cate,
      children: [
        {
          path: ':id',
          name: 'category',
          component: CategoryList,
        },
      ],
    }, {
      path: 'brand',
      component: Brand,
      children: [
        {
          path: ':id',
          name: 'brand',
          component: BrandList,
        },
      ],
    },
  ],
}, {
  path: '/cart',
  name: 'cart',
  text: '购物车',
  component: Cart,
  isTabbar: true,
  icon: 'cart',
}, {
  path: '/mine',
  name: 'mine',
  text: '我的',
  component: Mine,
  isTabbar: true,
  icon: 'mine',
}, {
  path: '/prolist/:id',
  component: ProList,
}, {
  path: '/detail/:id',
  component: Detail,
}, {
  path: '/logout',
  component: Logout,
}, {
  path: '/search',
  name: 'search',
  component: Search,
}];
