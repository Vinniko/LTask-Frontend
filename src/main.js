import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import axios from 'axios';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

axios.interceptors.request.use((request) => {
    request.auth = {
        username: 'test', // TODO Проставлять динамически, чтобы нельзя было получить в браузере
        password: 'test', // TODO Проставлять динамически, чтобы нельзя было получить в браузере
    }

    return request;
})

createApp(App).use(router).use(vuetify).mount('#app')
