import { Formik, Form, ErrorMessage, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllChannels, editSomeChannel } from "../channelsSlice";
import { editChannel } from "../../request";
import * as Yup from "yup";
import styles from "../css/RenamePopUp.module.css";
import { useTranslation } from "react-i18next";

function RenamePopUp({ setRenameToggler }) {
  const dispatch = useDispatch();
  const channels = useSelector((state) => selectAllChannels(state));
  const channelsNames = channels.map((item) => item.name);
  const {t} = useTranslation()
  const ref = useRef(null);
  const currentId = useSelector((state) => state.channels.currentChannelId);
  console.log("CurrentId RenamePopUp", currentId);
  const initialValue = {
    name: "",
  };

  console.log("channelsNames", channelsNames);
  const cancelHandler = () => {
    setRenameToggler(false);
  };

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <div>
      <div className={styles.renamePopUp_overlay}></div>
      <div className={styles.renamePopUp_container}>
      <a tabIndex={'1'} onClick={cancelHandler} className={styles.close_anchor}></a>
        <h4>{t('renameChannel')}</h4>
        <hr />
        <Formik
          initialValues={initialValue}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Name must be equal or more than 3 characters")
              .max(20, "Name must be equal or less than 20 characters")
              .notOneOf(channelsNames, "the name must be unique")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values rename", values);
            setSubmitting(false);
            editChannel(currentId, localStorage.getItem("token"), values.name);
            setRenameToggler(false);
            dispatch(
              editSomeChannel({ id: currentId, changes: { name: values.name } })
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field
                  innerRef={ref}
                  type="text"
                  id="name"
                  name="name"
                  className={styles.field}
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="name"
                  component="div"
                />
              </div>
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={cancelHandler}
                  className={styles.cancel_button}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submit_button}
                >
                  {t('submit')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RenamePopUp;
