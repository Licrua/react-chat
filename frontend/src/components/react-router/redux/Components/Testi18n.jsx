// import { Container, Navbar, FormControl, } from 'react-bootstrap';
// import { useEffect, useRef } from 'react';
import leoProfanity from 'leo-profanity';
import SplitBasicExample from './SplitBasicExample';
// import { Dropdown, ButtonGroup, Button, Stack } from 'react-bootstrap';

// const SplitBasicExample = () => {
//   return (
//     <Dropdown as={ButtonGroup}>
//       <Button variant="success">Split Button</Button>
//       <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };
// import Rebenok from './Rebenok';
const Component = () => {
  // const ref = useRef();
  // const ref2 = useRef();
  // const ref3 = useRef();
  // useEffect(() => {
  //   ref3.current.focus();
  // });
  // const onFocus = () => {
  //   ref.current.focus();
  // };
  // const onFocus2 = () => {
  //   ref2.current.focus();
  // };

  const text = 'shit fuck moron fucker pussy dick';
  leoProfanity.loadDictionary('ru');
  leoProfanity.loadDictionary('en');
  leoProfanity.add(['badword']);
  function checker() {
    const proverka = leoProfanity.check(text);
    console.log('proverka', proverka);
    const clean = leoProfanity.clean(text);
    console.log('clean', clean);
    return clean;
  }
  checker();

  return (
    <div style={{ width: '100px', height: '100px' }} className="box">
      <p>заглушка</p>
      <SplitBasicExample />
    </div>
    // <ul style={{ width: '100px', height: '100px' }} className="box">

    //   <Stack gap={3}>
    //     <li>
    //       <SplitBasicExample />
    //     </li>
    //     <SplitBasicExample />
    //     <SplitBasicExample />
    //   </Stack>
    // </ul>
  );
};

export default Component;
