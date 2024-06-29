import { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import styles from '../css/MessageForm.module.css';

const MessageForm = ({ handlerMessage }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className={styles.chat_message_form}>
      <Formik initialValues={{ message: '' }} onSubmit={handlerMessage}>
        {({ isSubmitting }) => (
          <Form style={{ display: 'flex', width: '100%' }}>
            <Field
              className={styles.input_form}
              type="text"
              name="message"
              placeholder={t('text')}
              innerRef={(node) => {
                inputRef.current = node;
              }}
            />
            <button aria-label="submit" type="submit" disabled={isSubmitting}>
              <p>dasdasda</p>
              {/* <a   className={styles.submit_anchor} /> */}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
