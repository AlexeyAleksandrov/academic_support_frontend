import { createApp } from 'vue';
import MainLayout from './components/layout/MainLayout.vue';
import router from './router';

createApp(MainLayout).use(router).mount('#app');
