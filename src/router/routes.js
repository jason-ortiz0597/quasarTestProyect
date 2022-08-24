
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'productTest', component: () => import('pages/test/ProductTest.vue') },
      { path: 'imageTest', component: () => import('pages/test/ImageTest.vue') },
      { path: 'productSiipi', component: () => import('pages/test/ProductSiipi.vue') },
      { path: 'tableProduct', component: () => import('pages/test/TableProduct.vue') },
      { path: 'provaiderTest', component: () => import('pages/almacenTest/ProvaiderTest.vue') },

     
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
