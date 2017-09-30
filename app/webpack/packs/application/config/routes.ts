import Authenticator from '../components/authenticator';
import Login from '../components/login';
import Signup from '../components/signup';
import Home from '../components/home';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'auth',
    path: '/',
    component: Authenticator,
    children: [
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        name: 'signup',
        path: '/signup',
        component: Signup,
      }
    ],
  },
];

export default routes;
