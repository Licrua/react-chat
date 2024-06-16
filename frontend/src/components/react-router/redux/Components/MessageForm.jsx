import { useRef } from 'react';
import styles from '../css/MessageForm.module.css';
import { Formik, Form, Field } from "formik";
import { useEffect } from 'react';

const MessageForm = ({ handlerMessage }) => { 
  const inputRef = useRef(null)
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
              placeholder="Введите информацию"
              innerRef={node => {
                inputRef.current = node
              }}
            />
            <button type="submit" disabled={isSubmitting}>V</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
