import newUser from '@utils/usersFunction/createUser';
import { errorOnRequest } from '@utils/toast/notify';
import { addUser } from '@slices/channelsSlice';
import _ from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useSignUpSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitLogic = useCallback(
    async (values, { setSubmitting }) => {
      console.log('valuesLOGIN', values);

      try {
        await newUser(values.username, values.password);
        dispatch(addUser({ id: _.uniqueId(), name: values.username }));
        console.log('срабатываю');
        navigate('/');
        const username = JSON.parse(localStorage.getItem('username'));
        console.log('usernameStorage', username);
      } catch (error) {
        errorOnRequest();
        console.error('Error during sign-up', error);
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, navigate],
  );

  return { onSubmitLogic };
};

export default useSignUpSubmit;
