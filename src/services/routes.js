// Importar components
import Todos from '../components/Todos'
import Tokens from '../components/Tokens'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import DeviceInfo from '../components/DeviceInfo'
import Cordova from '../components/Cordova'
import Notifications from '../components/Notifications'

const routes = [
  { path: '/',
    component: Todos,
    meta: { auth: true }
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
    meta: { auth: true }
  },
  { path: '/cordova',
    component: Cordova,
    meta: { auth: false }
  },
  { path: '*',
    component: NotFound,
    meta: { auth: false }
  }
]

export default routes
