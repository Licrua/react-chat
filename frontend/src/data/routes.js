import AuthPage from '@components/pages/AuthPage';
import ChatPage from '@components/pages/ChatPage';
import HomePage from '@components/pages/HomePage';

const routes = [
  { component: <AuthPage />, id: 1, path: '/login' },
  { component: <AuthPage />, id: 2, path: '/signUp' },
  { component: <ChatPage />, id: 3, path: '/chatPage' },
  //   { component: <HomePage />, id: 3, path: '/homePage' },
];

export default routes;
