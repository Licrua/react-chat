import { useDispatch, useSelector } from "react-redux";
import { addChannel, addMessage, addUser } from "./storik";

function Trial() {
  const dispatch = useDispatch();

  return (
    <>
    <button onClick={() => dispatch(addUser({id:1, name: 'persiksq', value: 'result'}))}>Добавить</button>
    <button onClick={() => dispatch(addMessage({id:1, name: 'channel1', value: 'turn on the light'}))}>Добавить</button>
      <p>trial</p>
    </>
  );
}

export default Trial;
