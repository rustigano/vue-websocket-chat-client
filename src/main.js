import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import store from './store/index'
import App from './App'

Vue.use(Buefy)

Vue.config.productionTip = true

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
