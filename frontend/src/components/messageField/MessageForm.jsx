import { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonToolbar, FormControl, InputGroup } from 'react-bootstrap';
import styles from '@styles/css/MessageForm.module.css';

const MessageForm = ({ handleMessageSubmit }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="mt-auto px-5 py-3">
      <Formik initialValues={{ message: '' }} onSubmit={handleMessageSubmit}>
        {({ isSubmitting }) => (
          <Form
            style={{
              display: 'flex',
            }}
          >
            <ButtonToolbar
              style={{ width: '100%' }}
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
                  aria-label="Новое сообщение"
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
