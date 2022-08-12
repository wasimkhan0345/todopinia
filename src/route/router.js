import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import TodoApp from '../components/TodoApp.vue'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/todoapp',
            name: 'todo-app',
            component: TodoApp
        },
        {
            path: '/todoform',
            name: 'todo-form',
            component: TodoForm
        },
        {
            path: '/todolist',
            name: 'todo-list',
            component: TodoList
        }
    ]
})

export default router