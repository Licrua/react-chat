import { errorOnRequest } from '@utils/toast/notify';
import { addUser, selectAllUsers } from '@slices/channelsSlice';
import _ from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useSignUpSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  console.log('users', users);

  const onSubmitLogic = useCallback(
    async (values, { setSubmitting }) => {
      console.log('valuesLOGIN', values);
      const newUser = { id: _.uniqueId(), name: values.username };

      try {
        dispatch(addUser(newUser));
        // await newUser(values.username, values.password);
        const updatedUsers = [...users, newUser];
        localStorage.setItem('username', JSON.stringify(updatedUsers));
        console.log('LOCALSTORE', JSON.parse(localStorage.getItem('username')));

        navigate('/');
        // const username = JSON.parse(localStorage.getItem('username'));
        // console.log('usernameStorage', username);
      } catch (error) {
        errorOnRequest();
        console.error('Error during sign-up', error);
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, navigate, users],
  );

  return { onSubmitLogic };
};

export default useSignUpSubmit;
