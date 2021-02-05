import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/default.config'

Vue.use(VueStorage, config.storageOptions)
