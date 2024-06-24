import { useRef } from 'react';
import styles from '../css/MessageForm.module.css';
import { Formik, Form, Field } from "formik";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MessageForm = ({ handlerMessage }) => { 
  const inputRef = useRef(null)
  const {t} = useTranslation()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <div className={styles.chat_message_form}>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={handlerMessage}
      >
        {({ isSubmitting }) => (
          <Form style={{display: 'flex', width: '100%'}}>  
            <Field
              className={styles.input_form}
              type="text"
              name="message"
              placeholder={t('text')}
              innerRef={node => {
                inputRef.current = node
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              <a className={styles.submit_anchor}></a>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
