import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from 'axios'
import * as Yup from 'yup'
import styles from './css/Login.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addLogin } from "./redux/loginSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.authorization)
  console.log('selector', selector);
  useEffect(() => {
        async function authorization  ()  {
          const value = await axios.post('/api/v1/login', { username: 'admin', password: 'admin' });
          console.log(value.data.token);
          localStorage.setItem('token', value.data.token)
        }
        authorization()
  }, [])
  return (
    <>
      <h1 className={styles.her}>FORMIK</h1>
      <p className={styles.p}>Форма</p>
      <Formik initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .min(6, 'username must be at minimum 6 symbols')
          .required('Required'),
        password: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .min(6, 'password must be more then 6 symbols')
          .required('Required'),
      })}
      onSubmit={(values, {setSubmitting}) => {
        console.log('values', values);
        dispatch(addLogin(values))
        if(localStorage.getItem('token').length > 0) {
          navigate('/')
        }
       else {
        navigate('/login')
       }
        setSubmitting(false)
      }}>
        <Form>
            <label htmlFor="username">Username</label>
            <Field type='username' name='username' />
            <ErrorMessage name='username' component='div' className={styles.error} />
            <label htmlFor="password"></label>
            <Field type='password' name='password'  />
            <ErrorMessage name='password' component='div' className={styles.error} />
            <button type="submit">Отправить</button>
        </Form>
      </Formik>
    </>
  );
};
export default Login;
