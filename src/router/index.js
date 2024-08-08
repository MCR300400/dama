import ContactView from '@/views/ContactView.vue'
import GameView from '@/views/GameView.vue'; // Importa il componente GameView
import HomePageView from '@/views/HomePageView.vue'
import RoulesView from '@/views/RoulesView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePageView
  },
  {
    path: '/rules',
    name: 'Rules',
    component: RoulesView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/game/:idGame',
    name: 'Game',
    component: GameView,
    props: true // Passa il parametro idGame come prop al componente
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
