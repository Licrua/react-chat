import ChatPage from '@components/pages/ChatPage';
import Login from '@components/pages/Login';
import NotFound from '@components/pages/NotFound';
import SignUp from '@components/pages/SignUp';

const routes = [
  { component: <Login />, id: 1, path: '/login' },
  { component: <SignUp />, id: 2, path: '/signUp' },
  { component: <ChatPage />, id: 4, path: '/' },
  { component: <NotFound />, id: 3, path: '*' },
];

export default routes;
