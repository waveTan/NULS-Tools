import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import User from './views/user/User.vue'
import NewAddress from './views/user/NewAddress.vue'
import BackupsAddress from './views/user/BackupsAddress.vue'
import Game from './views/game/Index.vue'
import Lucky from './views/game/lucky/Index.vue'
import GuessNumber from './views/game/guessNumber/GuessNumber.vue'
import More from './views/more/Index.vue'
import Tool from './views/tool/Index.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/user/NewAddress',
      name: 'newAddress',
      component: NewAddress
    },
    {
      path: '/user/BackupsAddress',
      name: 'backupsAddress',
      component: BackupsAddress
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/game/lucky',
      name: 'lucky',
      component: Lucky
    },
    {
      path: '/game/guessNumber',
      name: 'guessNumber',
      component: GuessNumber
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
