import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Roulette from './views/Roulette'
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
