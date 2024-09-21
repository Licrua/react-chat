import { errorOnRequest } from '@utils/toast/notify';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import leoProfanity from 'leo-profanity';

const useMessageSubmit = () => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const usernameValue = useMemo(() => {
    const users = JSON.parse(localStorage.getItem('username')) || [];
    console.log('ussers', users);

    console.log();

    return users[users.length - 1].username;
  }, []);

  //   const usernameValued a= localStorage.getItem('username');
  console.log('localestoragewithparse', usernameValue);

  const onSubmitLogic = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      const newMessage = {
        id: _.uniqueId(),
        value: leoProfanity.clean(values.message),
        channelId: currentChannelId,
        username: usernameValue,
      };
      console.log('newMessageSSSSSSSS', newMessage);

      try {
        const value = await axios.post('/api/v1/messages', newMessage, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('valueMESSAGE', value);
      } catch (error) {
        errorOnRequest();
        console.error('Failed to send message:', error);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
    [currentChannelId, usernameValue],
  );

  return { onSubmitLogic };
};

// нет диспатча
export default useMessageSubmit;
