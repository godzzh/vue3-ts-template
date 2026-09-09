import { createApp } from 'vue';
import App from '@/layouts/Provider.vue';
import { createPinia } from 'pinia';
import i18n from '@/i18n';
import router from '@/router';
import { setupGlobDirectives } from '@/directives';
import emitter from '@/utils/emitter';
import * as api from '@/services';
import * as utils from '@/utils/utils';
import { GlobalKey } from '@/types/injection-keys';
import dayjs from 'dayjs';

import 'vfonts/FiraSans.css';
import 'vfonts/FiraCode.css';
import 'remixicon/fonts/remixicon.css';
import '@/styles/global.less';
import '@/styles/main.css';

import './permission';

const app = createApp(App);
app.use(createPinia());
app.use(router);
// Naive UI 改为模板内组件按需自动引入（vite.config.ts 中 NaiveUiResolver），
// 不再 app.use(naive) 全量注册，避免整库打入主包
app.use(i18n);

setupGlobDirectives(app);

app.provide(GlobalKey, {
    $api: api.default,
    $utils: utils,
    $dayjs: dayjs,
    $emitter: emitter,
});

app.mount('#app');
