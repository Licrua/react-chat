import { addUser } from '@slices/channelsSlice';
import { newUser } from '@utils/request';
import { errorOnRequest } from '@utils/toast/notify';
import _ from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useSignUpSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitLogic = useCallback(
    async (values, { setSubmitting }) => {
      try {
        await newUser(values.username, values.password);
        dispatch(addUser({ id: _.uniqueId(), name: values.username }));
        navigate('/');
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
