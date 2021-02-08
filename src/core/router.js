import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const DEFAULT_BEFORE_ENTER = (to, from, next) => {
  next()
}

const getPackageConfig = path => {
  const _dirArray = path.split('/')
  const [_packageDir] = _dirArray.slice(1, 2)
  const _defaultConfig = { PACKAGE: _packageDir, PATH: _packageDir }
  try {
    return require(`@/packages/${_packageDir}/package.config`) || _defaultConfig
  } catch (error) {
    return _defaultConfig
  }
}

const getPackageRoutes = (tree, { PATH = '', PACKAGE = '', BEFORE_ENTER = DEFAULT_BEFORE_ENTER } = {}) => {
  const _result = tree.map(item => {
    const { path, name } = item
    const _path = PATH ? `/${PATH}${path}` : path
    const _name = PACKAGE ? `${PACKAGE}-${name}` : name
    const _beforeEnter = BEFORE_ENTER
    return { ...item, path: _path, name: _name, beforeEnter: _beforeEnter }
  })
  return _result
}

const modulesFiles = require.context('@/packages', true, /\.routes\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const _moduleValue = modulesFiles(modulePath).default
  const _packageConfig = getPackageConfig(modulePath)
  modules = [...modules, ...getPackageRoutes(_moduleValue, _packageConfig)]
  return modules
}, [])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...modules]
})

export default router
