// import { errorOnRequest } from '@utils/toast/notify';
// import { addUser, selectAllUsers } from '@slices/channelsSlice';
// import _ from 'lodash';
// import { useCallback, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const useSignUpSubmit = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const users = useSelector(selectAllUsers);
//   console.log('usersssss', users);

//   const onSubmitLogic = useCallback(
//     async (values, { setSubmitting }) => {
//       //   console.log('valuesLOGIN', values);
//       //   const newUser = { id: _.uniqueId(), name: values.username };
//       try {
//         const request = await axios.post('/api/v1/signup', {
//           username: values.username,
//           password: values.password,
//         });

//         const { token } = request.data;
//         const { username } = request.data;
//         const userExists = users.some((user) => user.name === username);
//         const newUser = { id: _.uniqueId(), name: username };
//         if (!userExists) {
//           dispatch(addUser(newUser));
//           const updatedUsers = [...users, newUser];
//           localStorage.setItem('username', JSON.stringify(updatedUsers));
//         }
//         console.log('request получен', request);
//         localStorage.setItem('token', token);

//         // await newUser(values.username, values.password);
//         console.log('LOCALSTORE', JSON.parse(localStorage.getItem('username')));

//         navigate('/login');
//         // const username = JSON.parse(localStorage.getItem('username'));
//         // console.log('usernameStorage', username);
//       } catch (error) {
//         errorOnRequest();
//         console.error('Error during sign-up', error);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [dispatch, navigate, users],
//   );

//   return { onSubmitLogic };
// };

// export default useSignUpSubmit;

import { errorOnRequest } from '@utils/toast/notify';
import { addUser, selectAllUsers } from '@slices/usersSlice';
import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useSignUpSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  console.log('usersssss', users);

  const onSubmitLogic = async (values, { setSubmitting }) => {
    try {
      const request = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      });

      const { token, username } = request.data;
      //   const userExists = users.some((user) => user.name === username);
      const newUser = { id: _.uniqueId(), name: username };
      dispatch(addUser(newUser));
      const updatedUsers = [...users, newUser];
      localStorage.setItem('username', JSON.stringify(updatedUsers));
      localStorage.setItem('token', token);

      navigate('/login');
    } catch (error) {
      errorOnRequest();
      console.error('Error during sign-up', error);
    } finally {
      setSubmitting(false);
    }
  };

  return { onSubmitLogic };
};

export default useSignUpSubmit;
