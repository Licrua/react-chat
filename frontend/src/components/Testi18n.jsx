// // import leoProfanity from 'leo-profanity';
// // eslint-disable-next-line no-unused-vars
// import {
//   Col,
//   Container,
//   Row,
//   Image,
//   Form,
//   Button,
//   Dropdown,
//   ButtonGroup,
//   SplitButton,
// } from 'react-bootstrap';
// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const Testi18n = () => {
//   const [log, setLog] = useState('');
//   const [pass, setPass] = useState('');
//   const [inputValue, setInputValue] = useState();
//   const storage = localStorage.getItem('user');
//   useEffect(() => {
//     // console.log('localeStorage', JSON.parse(localStorage.getItem('info')));
//     console.log('localStorageUser', localStorage.getItem('user'));
//   }, [storage]);

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//     // localStorage.setItem('user', inputValue);
//     console.log('inputValue', inputValue);
//   };
//   const oldValue = localStorage.getItem('user');
//   const handleOnClick = () => {
//     const user = { id: new Date(), value: inputValue };
//     localStorage.setItem('user', [...oldValue, user]);
//   };
//   //   const saveUsersToLocalStorage = (users) => {
//   //     localStorage.setItem('users', JSON.stringify(users));
//   //   };

//   const getUsersFromLocalStorage = () => {
//     const storedUsers = localStorage.getItem('info');
//     return storedUsers ? JSON.parse(storedUsers) : [];
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const prevResult = getUsersFromLocalStorage();
//     const newResult = { id: Date.now(), username: inputValue };
//     localStorage.setItem('info', JSON.stringify([...prevResult, newResult]));
//     console.log('Submitted value:', inputValue);
//   };

//   const axiousSignUpUser = async () => {
//     const request = await axios.post('/api/v1/signup', {
//       username: log,
//       password: pass,
//     });
//     return request.data;
//   };

//   const changeHandlerLogin = (e) => {
//     setLog(e.target.value);
//   };

//   const changeHandlerPassword = (e) => {
//     setPass(e.target.value);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="myInput">
//               <input
//                 id="myInput"
//                 type="text"
//                 value={inputValue} // Привязка значения к состоянию
//                 onChange={handleChange} // Обработчик изменений
//               />
//               Enter smth
//             </label>
//             <button onClick={handleOnClick} type="submit">
//               Submit
//             </button>
//           </form>
//         </Col>
//       </Row>
//       <Form>
//         <Row>
//           <Col xs={4} className="my-4">
//             <SplitButton
//               id="dropdown-split-variants-1"
//               variant="primary"
//               title="name"
//             >
//               <Dropdown.Item eventKey="1">Action</Dropdown.Item>
//               <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
//               <Dropdown.Item eventKey="3" active>
//                 Active Item
//               </Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
//             </SplitButton>
//             <Image
//               src="https://www.drupal.org/files/project-images/reg_confirm_email_with_button_0.png"
//               fluid
//               roundedCircle
//             />
//           </Col>
//           <Col className="d-flex flex-column justify-content-center">
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 onChange={changeHandlerLogin}
//                 value={log}
//                 type="email"
//                 placeholder="name@example.com"
//               />
//             </Form.Group>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Example textarea</Form.Label>
//               <Form.Control
//                 value={pass}
//                 type="password"
//                 onChange={changeHandlerPassword}
//               />
//             </Form.Group>
//             <Button onClick={axiousSignUpUser}>Отправить</Button>
//           </Col>
//         </Row>
//       </Form>
//     </Container>
//   );
// };

// export default Testi18n;

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Testi18n = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const itemmer = localStorage.getItem('items');
  console.log('item', itemmer);
  console.log('storage', JSON.parse(localStorage.getItem('items')));

  //   useEffect(() => {
  //     // Загружаем данные из localStorage при первом рендере
  //     const storedItems = JSON.parse(localStorage.getItem('items')) || [];
  //     setItems(storedItems);
  //   }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem = { id: Date.now(), value: inputValue };
      const updatedItems = [...items, newItem];
      console.log('updateItems', updatedItems);

      setItems(updatedItems);
      localStorage.setItem('items', JSON.stringify([...items, newItem]));
      setInputValue(''); // очищаем поле ввода
    }
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите значение"
      />
      <Button onClick={handleAddItem}>Добавить</Button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.value}{' '}
            <Button onClick={() => handleDeleteItem(item.id)}>Удалить</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Testi18n;
