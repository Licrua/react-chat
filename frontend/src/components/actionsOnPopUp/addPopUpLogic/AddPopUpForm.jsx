import React, { useRef, useEffect } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { addChannel, selectAllChannels } from '@slices/channelsSlice';
import { successfullyCreatedChannel } from '@utils/toast/notify';
import { addSomeChannel } from '@utils/request';
import socket from '@utils/webSocket';
import styles from '@styles/AddPopUp.module.scss';
import { setIsPopupToggle } from '@slices/popUpSlice';
import AddPopUpButtons from './AddPopUpButtons';

const AddPopUpForm = () => {
  const refFocus = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsSelector = useSelector((state) => selectAllChannels(state));
  const channelsNames = channelsSelector.map((item) => item.name);

  useEffect(() => {
    if (refFocus.current) {
      refFocus.current.focus();
    }
  }, []);

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, t('validation.username'))
          .min(3, t('validation.username'))
          .trim()
          .required(t('validation.requiredField'))
          .notOneOf(channelsNames, t('validation.unuqieChannel')),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const obj = {
          id: _.uniqueId(),
          name: leoProfanity.clean(values.name),
          removable: true,
        };
        setSubmitting(false);
        try {
          addSomeChannel(localStorage.getItem('token'), obj);
          socket.on('newChannel', (payload) => {
            dispatch(addChannel(payload));
          });
        } catch (error) {
          console.error(error);
        } finally {
          console.log('я в finally');

          setSubmitting(true);
          resetForm();
          dispatch(setIsPopupToggle(false));
          successfullyCreatedChannel();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <BootstrapForm.Control
              innerRef={refFocus}
              as={Field}
              name="name"
              id="name"
              isInvalid={errors.name && touched.name}
              type="text"
            />
            <BootstrapForm.Label className="visually-hidden" htmlFor="name">
              Channel name
            </BootstrapForm.Label>
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />
            <div className={styles.buttons}>
              <AddPopUpButtons />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPopUpForm;
