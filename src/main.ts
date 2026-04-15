import { createApp } from 'vue'
import App from '@/layouts/Provider.vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import i18n from '@/i18n'
import router from '@/router'
import { setupGlobDirectives } from "@/directives";
import emitter from '@/utils/emitter'
import * as api from "@/services";
import * as utils from '@/utils/utils'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

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

app.provide('global', {
    $api: api.default,
    $utils: utils,
    $dayjs: dayjs,
    $emitter: emitter,
})

app.mount('#app')
