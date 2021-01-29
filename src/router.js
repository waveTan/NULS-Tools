import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/*',
      name: 'home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['@/views/user/User.vue'], resolve)
    },
    {
      path: '/set',
      name: 'set',
      component: resolve => require(['@/views/user/Set.vue'], resolve)
    },
    {
      path: '/user/NewAddress',
      name: 'newAddress',
      component: resolve => require(['@/views/user/NewAddress.vue'], resolve)
    },
    {
      path: '/user/BackupsAddress',
      name: 'backupsAddress',
      component: resolve => require(['@/views/user/BackupsAddress.vue'], resolve)
    },
    {
      path: '/eco/tokenSwap',
      name: 'tokenSwap',
      component: resolve => require(['@/views/eco/TokenSwap.vue'], resolve)
    },
    {
      path: '/game',
      name: 'game',
      component: resolve => require(['@/views/game/Index.vue'], resolve)
    },
    {
      path: '/game/guessNumber',
      name: 'guessNumber',
      component: resolve => require(['@/views/game/guessNumber/GuessNumber.vue'], resolve)
    },
    {
      path: '/game/cannotGuess',
      name: 'cannotGuess',
      component: resolve => require(['@/views/game/cannotGuess/CannotGuess.vue'], resolve)
    },
    {
      path: '/game/goblin',
      name: 'goblin',
      component: resolve => require(['@/views/game/goblin/Goblin.vue'], resolve)
    },
    {
      path: '/game/lucky',
      name: 'lucky',
      component: resolve => require(['@/views/game/lucky/Index.vue'], resolve)
    },
    {
      path: '/more',
      name: 'more',
      component: resolve => require(['@/views/more/Index.vue'], resolve)
    },
    {
      path: '/tool',
      name: 'tool',
      component: resolve => require(['@/views/tool/Index.vue'], resolve)
    },
    {
      path: '/tool/newAddress',
      name: 'toolNewAddress',
      component: resolve => require(['@/views/tool/newAddress/Index.vue'], resolve)
    },
    {
      path: '/tool/lockedTransfer',
      name: 'lockedTransfer',
      component: resolve => require(['@/views/tool/lockedTransfer/Index.vue'], resolve)
    },
    {
      path: '/tool/oneToMore',
      name: 'oneToMore',
      component: resolve => require(['@/views/tool/oneToMore/OneToMore.vue'], resolve)
    },
    {
      path: '/dream',
      name: 'dream',
      component: resolve => require(['@/views/dream/Index.vue'], resolve)
    }
  ]
})
