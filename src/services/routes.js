// Importar components
import Todos from '../components/Todos'
import Tokens from '../components/Tokens'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import DeviceInfo from '../components/DeviceInfo'
import Cordova from '../components/Cordova'
import Tests from '../components/Tests'
import Locations from '../components/Locations'
import Notifications from '../components/Notifications'
import Exit from '../components/Exit'

const routes = [
  { path: '/android_asset/www/index.html',
    component: Login,
    meta: { auth: false }
  },
  { path: '/index.html',
    component: Login,
    meta: { auth: false }
  },
  { path: '',
    component: Login,
    meta: { auth: false }
  },
  { path: '/',
    component: Login,
    meta: { auth: false }
  },
  { path: '/todos',
    component: Todos,
    meta: { auth: true }
  },
  { path: '/tokens',
    component: Tokens,
    meta: { auth: false }
  },
  { path: '/profile',
    component: Profile,
    meta: { auth: true }
  },
  { path: '/login',
    component: Login,
    meta: { auth: false }
  },
  { path: '/device',
    component: DeviceInfo,
    meta: { auth: false }
  },
  { path: '/notifications',
    component: Notifications,
    props: (route) => ({
      params: route.params.notifications
    }),
    meta: { auth: true }
  },
  { path: '/cordova',
    component: Cordova,
    meta: { auth: false }
  },
  { path: '/tests',
    component: Tests,
    meta: { auth: false }
  },
  { path: '/locations',
    component: Locations,
    meta: { auth: false }
  },
  { path: '/exit',
    component: Exit,
    meta: { auth: false }
  },
  { path: '*',
    component: NotFound,
    meta: { auth: false }
  }
]

export default routes
