import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigation = useNavigate();
  const onClickHandler = () => {
    navigation('/login');
  };
  return (
    <Button onClick={onClickHandler} style={{ letterSpacing: '5px' }}>
      Давай общаться
    </Button>
  );
};
export default HomeButton;
