import Vue from 'vue'
import antmoment from 'moment'
import 'moment/locale/zh-cn'
antmoment.locale('zh-cn')

const filters = {
  moment(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return antmoment(dataStr).format(pattern)
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters
