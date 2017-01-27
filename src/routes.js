// Importar components
import Todos from 'components/Todos'
import Tokens from 'components/Tokens'
import Profile from 'components/Profile'
import NotFound from 'components/NotFound'

const routes = [
    { path: '/todos', component: Todos },
    { path: '/tokens', component: Tokens },
    { path: '/profile', component: Profile },
    { path: '*', component: NotFound }

]

export default routes
