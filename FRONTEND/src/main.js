import './assets/stype.css';
import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import router from "./router";
import store from './store';

createApp(App).mount("#app");
createApp(App).use(router).use(store).mount("#app");



