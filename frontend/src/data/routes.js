import AuthPage from '@components/pages/AuthPage';
import ChatPage from '@components/pages/ChatPage';
import NotFound from '@components/pages/NotFound';

const routes = [
  { component: <AuthPage />, id: 1, path: '/login' },
  { component: <AuthPage />, id: 2, path: '/signUp' },
  { component: <ChatPage />, id: 3, path: '/' },
  { component: <NotFound />, id: 4, path: '*' },
];

export default routes;
