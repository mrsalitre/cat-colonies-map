import Vue from 'vue'
const Gun = require('gun')
require('gun/sea')
Vue.prototype.$gun = Gun({
  peers: ['https://cat-colonies-relay-01.herokuapp.com/gun'],
})
