import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Roulette from './views/Roulette'
import LuckyWheel from './views/roulette/LuckyWheel'
import Guess from './views/Guess'
import More from './views/More'
import Tool from './views/Tool'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/roulette',
      name: 'roulette',
      component: Roulette
    },
    {
      path: '/roulette/luckyWheel',
      name: 'luckyWheel',
      component: LuckyWheel
    },
    {
      path: '/guess',
      name: 'guess',
      component: Guess
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
