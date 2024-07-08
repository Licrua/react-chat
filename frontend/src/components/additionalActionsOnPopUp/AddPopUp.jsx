import React, { useEffect, useRef } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Button, CloseButton, Form as BootstrapForm } from 'react-bootstrap';
import { successfullyCreatedChannel } from '@utils/toast/notify';
import { addSomeChannel } from '@utils/request';
import { selectAllChannels, addChannel } from '@slices/channelsSlice';
import socket from '@utils/webSocket';
import styles from '@styles/css/ChatPopUp.module.css';

const AddPopUp = ({ setIsPopupToggle }) => {
  const refPopUp = useRef();
  const refFocus = useRef();
  const refOverlay = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsSelector = useSelector((state) => selectAllChannels(state));
  const channelsNames = channelsSelector.map((item) => item.name);

  const closeDialog = () => {
    setIsPopupToggle(false);
  };

  useEffect(() => {
    if (refFocus.current) {
      refFocus.current.focus();
    }
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="close_button"
        onClick={closeDialog} // здесь был div изначально
        ref={refOverlay}
        className={styles.popUp_overlay}
      />
      <div className={styles.popUp_container} ref={refPopUp}>
        <CloseButton
          className={styles.close_anchor}
          onClick={closeDialog}
          aria-label="Hide"
        />
        <h4>{t('addChannel')}</h4>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={Yup.object({
            channelName: Yup.string()
              .max(20, t('validation.username'))
              .min(3, t('validation.username'))
              .trim()
              .required(t('validation.requiredField'))
              .notOneOf(channelsNames, t('validation.unuqieChannel')),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const obj = {
              id: _.uniqueId(),
              name: leoProfanity.clean(values.channelName),
              removable: true,
            };
            setSubmitting(false);
            if (values.channelName.length >= 9) {
              console.log('valuesSumbit', values.channelName);
            }
            try {
              addSomeChannel(localStorage.getItem('token'), obj);
              socket.on('newChannel', (payload) => {
                dispatch(addChannel(payload));
              });
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(true);
              resetForm();
              setIsPopupToggle(false);
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
                  name="channelName"
                  isValidate={errors.channelName && touched.channelName}
                  type="text"
                />
                <ErrorMessage
                  name="channelName"
                  component="div"
                  className={styles.errorMessage}
                />
                <div className={styles.buttons}>
                  <Button variant="danger" onClick={closeDialog} type="button">
                    {t('cancel')}
                  </Button>
                  <Button variant="primary" type="submit">
                    {t('create')}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default AddPopUp;
