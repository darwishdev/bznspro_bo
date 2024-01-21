import { createApp } from 'vue'
import dashkitConfig from '@/plugins/vuedashkit.config'
import App from './App.vue'
import router from './router'
import VueDashkit from 'v-dashkit'
import '@/assets/primeflex.scss'
import '@/assets/base.scss'
import 'v-dashkit/style'
import "primeicons/primeicons.css"
// import 'v-dashkit/AppLayout.css'
// import 'v-dashkit/theme.css'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';

const app = createApp(App)

app.use(router)
    .use(DialogService)
    .use(ToastService)
    .use(VueDashkit, dashkitConfig)

app.mount('#app')
