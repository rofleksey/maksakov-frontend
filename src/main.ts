import {createApp} from 'vue'
import {createPinia} from 'pinia'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.directive('click-outside', {
  beforeMount: function (element, binding) {
    element.clickOutsideEvent = function (event: MouseEvent) {
      if (!(element === event.target || element.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent);
  },
  unmounted: function (element) {
    document.body.removeEventListener('click', element.clickOutsideEvent);
  }
});

app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount('#app')
