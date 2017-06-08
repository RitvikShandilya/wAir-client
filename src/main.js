import Vue from 'vue'
import VueMaterial from 'vue-material';
import SocialSharing from 'vue-social-sharing';
import VueRouter from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
import VueCookie from 'vue-cookie';

import {router} from './routes'

Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.use(VueMaterial);
Vue.use(VueQuillEditor);
Vue.use(VueCookie);

Vue.material.registerTheme({
    default: {
        primary: 'cyan',
        accent: 'blue-grey'
    }
});

const app = new Vue({
    router
}).$mount('#app');