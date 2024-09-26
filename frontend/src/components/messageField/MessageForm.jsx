import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  //   ButtonToolbar,
  Form as FormControl,
  InputGroup,
} from 'react-bootstrap';
import useMessageSubmit from 'hooks/useMessageSubmit';

const MessageForm = () => {
  const { onSubmitLogic } = useMessageSubmit();

  const { t } = useTranslation();
  return (
    <div className="mt-auto px-5 py-3">
      <Formik initialValues={{ message: '' }} onSubmit={onSubmitLogic}>
        {({ isSubmitting }) => (
          <Form
            style={{
              display: 'flex',
            }}
          >
            <InputGroup className="mb-3 d-flex justify-content-center">
              <FormControl
                as={Field}
                autoFocus
                // style={{ width: '80%' }}
                className="border rounded border-3  p-2  w-75"
                name="message"
                type="text"
                placeholder={t('text')}
                aria-label="users message field"
                aria-describedby="basic-addon1"
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="outline-secondary"
                id="button-addon1"
                className="rounded border-2"
              >
                {'\u21AA'}
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
