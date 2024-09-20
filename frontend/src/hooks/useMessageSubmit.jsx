import { errorOnRequest } from '@utils/toast/notify';
import _ from 'lodash';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import leoProfanity from 'leo-profanity';

const useMessageSubmit = () => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const usernameValue = JSON.parse(localStorage.getItem('username'));
  const usernameValued = localStorage.getItem('username');
  console.log('localstoragewithoutparse', usernameValued);
  console.log('localestoragewithparse', usernameValue);

  const onSubmitLogic = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      const newMessage = {
        id: _.uniqueId(),
        value: leoProfanity.clean(values.message),
        channelId: currentChannelId,
        username: usernameValue?.username,
      };

      try {
        await axios.post('/api/v1/messages', newMessage, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } catch (error) {
        errorOnRequest();
        console.error('Failed to send message:', error);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
    [currentChannelId],
  );

  return { onSubmitLogic };
};

export default useMessageSubmit;
