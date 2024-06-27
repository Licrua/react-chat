import { ErrorMessage, Field, Formik, Form } from "formik";
import styles from "../css/ChatPopUp.module.css";
import * as Yup from "yup";
import { selectAllChannels } from "../channelsSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSomeChannel } from "../../request";
import { addChannel } from "../channelsSlice";
import socket from "../../webSocket";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { successfullyCreatedChannel } from "../../../../toast/notify";
import leoProfanity from 'leo-profanity';
function AddPopUp({setIsPopupToggle}) {
  const refPopUp = useRef();
  const refFocus = useRef();
  const refOverlay = useRef();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const channelsSelector = useSelector((state) => selectAllChannels(state));
  const channelsNames = channelsSelector.map((item) => item.name);
  
  const closeDialog = () => {
      setIsPopupToggle(false)
  };

  useEffect(() => {
    refFocus.current.focus();
    
  },[]);

  return (
    <>
      <div onClick={() => closeDialog()} ref={refOverlay} className={styles.popUp_overlay}></div>
      <div className={styles.popUp_container} ref={refPopUp}>
        <a className={styles.close_anchor} onClick={closeDialog} />
        <h2>{t("addChannel")}</h2>
        <Formik
          initialValues={{ channelName: "" }}
          validationSchema={Yup.object({
            channelName: Yup.string()
              .min(3, "Must be more then 3 characters")
              .max(15, "Must be 15 characters or less")
              .notOneOf(channelsNames, "channels name must be unique")
              .required("Required field"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const obj = {
              id: _.uniqueId(),
              name: leoProfanity.clean(values.channelName),
              removable: true,
            };
            setSubmitting(false);
            try {
              addSomeChannel(localStorage.getItem("token"), obj);
              socket.on("newChannel", (payload) => {
                dispatch(addChannel(payload));
              });
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(true);
              resetForm();
              setIsPopupToggle(false)
              successfullyCreatedChannel()
            }
           
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  innerRef={refFocus}
                  className={`${styles.popUp_field} ${
                    touched.channelName && errors.channelName
                      ? styles.inputError
                      : ""
                  }`}
                  name="channelName"
                  type="text"
                />
                <ErrorMessage
                  name="channelName"
                  component="div"
                  className={styles.errorMessage}
                >
                  {/* {(msg) => <div className={styles.error}>{msg}</div>} */}
                </ErrorMessage>
                <div className={styles.buttons}>
                  <button
                    className={styles.popUp_close_button}
                    onClick={closeDialog}
                    type="button"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={() => console.log('dasda')}
                    className={styles.popUp_submit_button}
                    type="submit"
                  >
                    {t("create")}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default AddPopUp;
