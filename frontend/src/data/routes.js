import Authorization from '@components/authorization/Authorization';
import ChatPage from '@components/pages/ChatPage';
import NotFound from '@components/pages/NotFound';

const routes = [
  { component: <Authorization />, id: 1, path: '/login' },
  { component: <Authorization />, id: 2, path: '/signUp' },
  { component: <ChatPage />, id: 3, path: '/' },
  { component: <NotFound />, id: 4, path: '*' },
];

export default routes;
