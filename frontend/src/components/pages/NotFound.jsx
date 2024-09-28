import { useSelector } from 'react-redux';

const NotFound = () => {
  const popUp = useSelector((state) => state.popUp);
  console.log('popUp', popUp);

  return <p>something wents wrong. </p>;
};
export default NotFound;
