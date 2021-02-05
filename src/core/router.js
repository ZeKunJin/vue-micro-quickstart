import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const getPackageConfig = path => {
  const _dirArray = path.split('/')
  const [_packageDir] = _dirArray.slice(1, 2)
  try {
    return require(`@/packages/${_packageDir}/package.config`)
  } catch (error) {
    return { PACKAGE: _packageDir, PATH: _packageDir }
  }
}

const getPackageRoutes = (tree, { PATH = '', PACKAGE = '' } = {}) => {
  const _result = tree.map(item => {
    const { path, name } = item
    const _path = PATH ? `/${PATH}${path}` : path
    const _name = PACKAGE ? `${PACKAGE}-${name}` : name
    return { ...item, path: _path, name: _name }
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
