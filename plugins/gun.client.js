import Vue from 'vue'
const Gun = require('gun')
require('gun/sea')
Vue.prototype.$gun = Gun({
  peers: ['https://cat-colonies-map.vercel.app/'],
})
