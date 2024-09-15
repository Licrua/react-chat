// RenameForm.jsx
import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form as BootstrapForm } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { editChannel } from '@utils/request';
import { setRenameToggler } from '@slices/popUpSlice';
import socket from '@utils/webSocket';
import { editSomeChannel, selectAllChannels } from '@slices/channelsSlice';
import {
  successfullyRenamedChannel,
  errorOnRequest,
} from '@utils/toast/notify';
import styles from '@styles/RenamePopUp.module.scss';

const RenameForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => selectAllChannels(state));
  const channelsNames = channels?.map((item) => item.name);
  const { t } = useTranslation();
  const ref = useRef(null);
  const currentId = useSelector((state) => state.channels.currentChannelId);

  const initialValue = { name: '' };

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
  }, [dispatch]);

  return (
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
        editChannel(currentId, localStorage.getItem('token'), values.name);
        // setRenameToggler(false);
        successfullyRenamedChannel();
        setSubmitting(false);
        onClose();
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
              onClick={onClose}
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
  );
};

export default RenameForm;
