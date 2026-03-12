import { createApp } from 'vue'
import App from '@/layouts/Provider.vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import i18n from '@/i18n'
import router from '@/router'
import { setupGlobDirectives } from "@/directives";

import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'
import '@/styles/global.less'
import '@/styles/main.css'

import "./permission"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(naive)
app.use(i18n)

setupGlobDirectives(app)

app.mount('#app')
