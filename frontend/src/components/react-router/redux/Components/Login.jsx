import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import styles from '../css/Login.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getChannel,
  getMessage,
  newUser,
  loginUser,
  checkRender,
} from "../../request";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <>
      <h1 className={styles.her}>FORMIK</h1>
      <p className={styles.p}>Форма</p>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(6, "username must be at minimum 6 symbols")
            .required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(6, "password must be more then 6 symbols")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          setSubmitting(true);
          async function main() {
            async function createUser() {
              try {
                const request = await axios.post("/api/v1/signup", {
                  username: values.username,
                  password: values.password,
                });
                return request;
              } catch (e) {
                console.log("Ошибка", e.message);
              }
            }
            async function loginUser() {
              try {
                const login = await axios.post("/api/v1/login", {
                  username: values.username,
                  password: values.password,
                });
                localStorage.setItem("token", login.data.token);
                localStorage.setItem("username", login.data.username);
                console.log("login", login);
              } catch (e) {
                console.log("Ошибка", e.message);
              } finally {
                setSubmitting(false);
              }
            }
           await  createUser();
          await loginUser();
            navigate("/");
          }
          main();
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>    
          <Field type="username" name="username" />
          <ErrorMessage
            name="username"
            component="div"
            className={styles.error}
            />
            <br></br>
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
          <button type="submit">Отправить</button>
        </Form>
      </Formik>
    </>
  );
};
export default Login;
