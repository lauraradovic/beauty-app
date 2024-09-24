import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import FooTer from "./components/FooTer.vue";
import NavBar from "./components/NavBar.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";




createApp(App)
  .use(router)
  .component("FooTer", FooTer)
  .component("NavBar", NavBar)
  .mount("#app");

  
