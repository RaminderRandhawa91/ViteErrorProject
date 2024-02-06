import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
import App from "./App.vue";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import "devextreme/dist/css/dx.light.css";
import "@/assets/styles/site.scss";

import { createPinia } from "pinia";

// Get the localization setup
const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages,
});

const app = createApp(App);
app.use(i18n);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
