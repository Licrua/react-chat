import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form as BootstrapForm, CloseButton } from 'react-bootstrap';
import { selectAllChannels, editSomeChannel } from '@slices/channelsSlice';
import {
  successfullyRenamedChannel,
  errorOnRequest,
} from '@utils/toast/notify';
import socket from '@utils/webSocket';
import { editChannel } from '@utils/request';
import styles from '@styles/RenamePopUp.module.scss';

const RenamePopUp = ({ setRenameToggler }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => selectAllChannels(state));
  const channelsNames = channels.map((item) => item.name);
  const { t } = useTranslation();
  const ref = useRef(null);
  const currentId = useSelector((state) => state.channels.currentChannelId);
  console.log('CurrentId RenamePopUp', currentId);
  const initialValue = {
    name: '',
  };

  console.log('channelsNames', channelsNames);
  const closeWindow = () => {
    setRenameToggler(false);
  };

  useEffect(() => {
    if (socket) {
      try {
        ref.current.focus();
        socket.on('renameChannel', (payload) => {
          dispatch(
            editSomeChannel({
              id: payload.id,
              changes: { name: payload.name },
            }),
          );
        });
      } catch (e) {
        errorOnRequest();
        console.error(e);
      }
    }
  }, [dispatch]); // убран socket с зависимостей

  return (
    <div>
      <div className={styles.renamePopUp_overlay} />
      <div className={styles.renamePopUp_container}>
        <CloseButton
          aria-label="Hide"
          className="position-absolute top-0 p-2  end-0"
          onClick={closeWindow}
        />
        <h4>{t('renameChannel')}</h4>
        <hr className={styles.line} />
        <Formik
          initialValues={initialValue}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(20, t('validation.username'))
              .min(3, t('validation.username'))
              .trim()
              .required(t('validation.requiredField'))
              .notOneOf(channelsNames, t('validation.unuqieChannel')),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log('values rename', values);
            setSubmitting(false);
            editChannel(currentId, localStorage.getItem('token'), values.name);
            setRenameToggler(false);
            successfullyRenamedChannel();
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div>
                <BootstrapForm.Control
                  as={Field}
                  innerRef={ref}
                  type="text"
                  id="name"
                  name="name"
                  className={styles.field}
                  isInvalid={touched.name && errors.name}
                />
                <BootstrapForm.Label className="visually-hidden" htmlFor="name">
                  Channel name
                </BootstrapForm.Label>
                <ErrorMessage
                  className={styles.errorMessage}
                  name="name"
                  component="div"
                />
              </div>
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={closeWindow}
                  className={styles.cancel_button}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submit_button}
                >
                  {t('rename')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RenamePopUp;
