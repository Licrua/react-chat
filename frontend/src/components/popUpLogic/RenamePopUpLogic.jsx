// CombinedPopUp.jsx
import React, { useRef, useEffect, forwardRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button } from 'react-bootstrap';
import { editChannel } from '@utils/request';
import { successfullyRenamedChannel } from '@utils/toast/notify';
import styles from '@styles/CombinedPopUp.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const RenamePopUpLogic = forwardRef(
  ({ channelsNames, closePopupHandlers }, ref) => {
    const { t } = useTranslation();
    const currentId = useSelector((state) => state.channels.currentChannelId);
    console.log('chnannelsNames', channelsNames);

    return (
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, t('validation.username'))
            .min(3, t('validation.username'))
            .trim()
            .required(t('validation.requiredField'))
            .notOneOf(channelsNames || [], t('validation.unuqieChannel')),
        })}
        onSubmit={(values, { setSubmitting }) => {
          editChannel(currentId, localStorage.getItem('token'), values.name);
          successfullyRenamedChannel();
          setSubmitting(false);
          closePopupHandlers.rename();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <BootstrapForm.Control
                as={Field}
                innerRef={ref}
                type="text"
                id="name"
                name="name"
                isInvalid={touched.name && errors.name}
                className={styles.field}
              />
              <BootstrapForm.Label className="visually-hidden" htmlFor="name">
                channelName
              </BootstrapForm.Label>
              {/* <ErrorMessage
                className={styles.error_message}
                name="name"
                component="div"
              /> */}
            </div>
            <div className="d-flex justify-content-center gap-2 mb-2">
              <Button
                type="button"
                onClick={closePopupHandlers.rename}
                variant="secondary"
              >
                {t('cancel')}
              </Button>
              <Button type="submit" variant="success" disabled={isSubmitting}>
                {t('rename')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  },
);

export default RenamePopUpLogic;
