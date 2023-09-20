import { createApp } from 'vue';
import './assets/fonts.scss';
import './assets/variables.scss';
import './assets/base.scss';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
