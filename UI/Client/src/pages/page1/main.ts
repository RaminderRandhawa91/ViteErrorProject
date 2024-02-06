import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import App from "./App.vue";


// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import "devextreme/dist/css/dx.light.css";
import "@/assets/styles/site.scss";

// https://github.com/gridstack/gridstack.js/blob/master/README.md#install
import "gridstack/dist/gridstack.min.css";

import { createPinia } from "pinia";

// Get the localization setup
const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages,
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(i18n);
app.mount('#app');

