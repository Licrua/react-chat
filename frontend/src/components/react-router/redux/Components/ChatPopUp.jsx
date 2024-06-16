import { ErrorMessage, Field, Formik, Form } from "formik";
import styles from "../css/ChatPopUp.module.css";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSomeChannel } from "../../request";
import { addChannel } from "../channelsSlice";
import _ from "lodash";
function ChatPopUp({proper}) {
  const refPopUp = useRef();
  const refFocus = useRef();
  const channels = useSelector(state => state.channels);
  const dispatch = useDispatch()
  console.log('channelsPopUp', channels);



 



  const closeDialog = () => {
    if(refPopUp.current) {
      proper(false)
    }
  }


  return (
  <>
    <div onClick={() => closeDialog()} className={styles.popUp_overlay}></div>
    <dialog ref={refPopUp}>
      <h2>Добавить Канал</h2>
      <Formik
        initialValues={{ channelName: "" }}
        validationSchema={Yup.object({
          channelName: Yup.string()
            .min(3, "Must be more then 3 characters")
            .max(15, "Must be 15 characters or less")
            .required("Required field"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          const obj = {id: _.uniqueId(), name: values.channelName, removable: true  }
          console.log('tokenPopUp',localStorage.getItem('token'));
          addSomeChannel(localStorage.getItem('token'), obj)
          dispatch(addChannel(obj))
          setSubmitting(true);
          resetForm()
          closeDialog()
        }}
      >
        
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field 
               innerRef={node => {
                refFocus.current = node
              }}
             
                className={`${styles.popUp_field} ${touched.channelName && errors.channelName ? styles.inputError : ''}`}
                name="channelName"
                type="text"
              />
              <ErrorMessage name="channelName">
                {msg => <div className={styles.error}>{msg}</div>}
              </ErrorMessage>
              <button
                className={styles.popUp_close_button}
                onClick={closeDialog}
                type="button"
              >
                Отменить
              </button>
              <button className={styles.popUp_submit_button} type="submit">
                Создать
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </dialog>
  </>

  );
};
export default ChatPopUp;
