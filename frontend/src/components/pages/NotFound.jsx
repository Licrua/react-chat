import { useSelector } from 'react-redux';

const NotFound = () => {
  const popUp = useSelector((state) => state.popUp);
  'popUp', popUp;

  return <p>something wents wrong. </p>;
};
export default NotFound;
