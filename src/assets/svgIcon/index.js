import Vue from 'vue'
import svgIcon from '@/components/svg-icon'

Vue.component('svg-icon', svgIcon) // 挂载在全局

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req);
