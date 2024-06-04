import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from 'axios'
import * as Yup from 'yup'
import styles from './css/Login.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addUsers, addChannels, addUserData} from "./redux/loginSlice";
import { useNavigate } from "react-router-dom";
import { getChannel, getMessage, newUser, loginUser} from "./request";
import socket from "./webSocket";


const Login = () => {
  const selector = useSelector(state => state.login.currentUser)
  const [isSubmit, setIsSumbit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()



console.log('socket', socket);

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
        setIsSumbit(true)
        async function main() {
          async function createUser() {
           const request =  await axios.post('/api/v1/signup', { username: values.username, password: values.password})
              return request
          }
          async function loginUser() {
              const login = await axios.post('/api/v1/login', { username: values.username, password: values.password })
              localStorage.setItem('token', login.data.token)
          }
          createUser()
          loginUser()
          navigate('/')
        }
        main()

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
