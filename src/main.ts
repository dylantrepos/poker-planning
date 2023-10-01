import { createApp } from 'vue';
import './assets/fonts.scss';
import './assets/variables.scss';
import './assets/base.scss';
import router from './router';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(router);

app.mount('#app');
