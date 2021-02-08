import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

class CustomVueRouter extends VueRouter {
  constructor(routerConfig) {
    super(routerConfig)
  }

  override(method, { PACKAGE }) {
    const _this = this
    const _super = super[method]
    this[PACKAGE] = {
      [method](location, onComplete, onAbort) {
        const { name } = location
        location.name = PACKAGE ? `${PACKAGE}-${name}` : name
        _super.bind(_this)(location, onComplete, onAbort)
      }
    }
  }
}

const _packageConfigArray = []

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

const getPackageRoutes = (tree, { PATH = '', PACKAGE = '', BEFORE_ENTER = undefined } = {}) => {
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
  _packageConfigArray.push(_packageConfig)
  modules = [...modules, ...getPackageRoutes(_moduleValue, _packageConfig)]
  return modules
}, [])

const router = new CustomVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...modules]
})

_packageConfigArray.forEach(element => {
  router.override('push', element)
})

export default router
