import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Game from './views/game/Index.vue'
import More from './views/more/Index.vue'
import Tool from './views/tool/Index.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/more',
      name: 'more',
      component: More
    },
    {
      path: '/tool',
      name: 'tool',
      component: Tool
    }
  ]
})
