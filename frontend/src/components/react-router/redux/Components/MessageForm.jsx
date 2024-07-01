import { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonToolbar, FormControl, InputGroup } from 'react-bootstrap';
// import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import styles from '../css/MessageForm.module.css';

const MessageForm = ({ handlerMessage }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div style={{ width: '100%' }} className={styles.chat_message_form}>
      <Formik initialValues={{ message: '' }} onSubmit={handlerMessage}>
        {({ isSubmitting }) => (
          <Form style={{ display: 'flex', width: '100%' }}>
            <ButtonToolbar
              style={{ width: '80%' }}
              className="mb-3"
              aria-label="Toolbar with Button groups"
            >
              <InputGroup style={{ width: '100%' }}>
                <FormControl
                  size="lg"
                  as={Field}
                  className={styles.input_form}
                  type="text"
                  name="message"
                  aria-label="Input group example"
                  aria-describedby="btnGroupAddon"
                  placeholder={t('text')}
                  innerRef={inputRef}
                />
                <InputGroup.Text
                  disabled={isSubmitting}
                  role="button"
                  type="submit"
                  id="btnGroupAddon"
                >
                  {'\u21AA'}
                </InputGroup.Text>
              </InputGroup>
            </ButtonToolbar>
            {/* <button aria-label="submit" type="submit" disabled={isSubmitting}>
              <p>Отправить</p>
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
