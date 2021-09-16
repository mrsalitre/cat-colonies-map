import Vue from 'vue'
const Gun = require('gun')
require('gun/sea')
Vue.prototype.$gun = Gun()
