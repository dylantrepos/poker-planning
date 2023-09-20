import { createApp } from 'vue';
import './assets/fonts.scss';
import './assets/variables.scss';
import './assets/base.scss';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app');
