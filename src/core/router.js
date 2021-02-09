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

const getPackageRoutes = (tree, config = {}, isChildren = false) => {
  const { PATH = '', PACKAGE = '', BEFORE_ENTER = undefined } = config
  const _result = tree.map(item => {
    const name = PACKAGE ? `${PACKAGE}-${item.name}` : item.name
    const path = PATH && !isChildren ? `/${PATH}${item.path}` : item.path
    const beforeEnter = !isChildren ? BEFORE_ENTER : undefined

    if (item.children && item.children.length > 0) {
      item.children = getPackageRoutes(item.children, config, true)
    }

    return { ...item, path, name, beforeEnter }
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

console.log(modules)

_packageConfigArray.forEach(element => {
  router.override('push', element)
})

export default router
