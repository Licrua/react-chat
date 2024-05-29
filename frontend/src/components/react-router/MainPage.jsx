
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate()
    console.log('location', location);
    return (
 <h1>Главная страница</h1>
    )
}

export default MainPage
