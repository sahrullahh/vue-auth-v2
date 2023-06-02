import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import "./assets/main.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from "./store";

const app = createApp(App).use(store);
app.use(router).mount("#app");
