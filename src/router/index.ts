import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/home/Home.vue'
import TokenSwap from '../views/eco/TokenSwap.vue'
import Game from '../views/game/Index.vue'
import GuessNumber from '../views/game/guessNumber/GuessNumber.vue'
import More from '../views/more/Index.vue'
import lockedTransfer from '../views/more/lockedTransfer/Index.vue'
import Tool from '../views/tool/Index.vue'
import newAddress from '../views/tool/newAddress/Index.vue'

export default createRouter({
    // 指定路由的模式,此处使用的是hash模式
    history: createWebHashHistory(),
    // 路由地址
    routes: [
        {
            path: '/*',
            name: "首页",
            component: Home
        },
        {
            path: '/home',
            name: "home",
            component: Home
        },
        /*{
            path: '/eco/tokenSwap',
            name: 'tokenSwap',
            component: TokenSwap
        },*/
        {
            path: '/game',
            name: 'game',
            component: Game
        },
        /*{
            path: '/game/guessNumber',
            name: 'guessNumber',
            component: GuessNumber
        },*/
        {
            path: '/more',
            name: 'more',
            component: More
        },
        /*{
            path: '/more/lockedTransfer',
            name: 'lockedTransfer',
            component: lockedTransfer
        },*/
        {
            path: '/tool',
            name: 'tool',
            component: Tool
        },
        {
            path: '/tool/newAddress',
            name: 'toolNewAddress',
            component: newAddress
        }
    ]
})