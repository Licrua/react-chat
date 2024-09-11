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
import styles from '@styles/AddPopUp.module.scss';

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
        onClick={closeDialog}
        ref={refOverlay}
        className={styles.popUp_overlay}
      />
      <div className={styles.popUp_container} id="popup_window" ref={refPopUp}>
        <CloseButton
          className={styles.close_anchor}
          onClick={closeDialog}
          aria-label="Hide"
        />
        <h4>{t('addChannel')}</h4>
        <hr className={styles.line} />
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
            if (values.name.length >= 9) {
              console.log('valuesSumbit', values.name);
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
