import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import * as Yup from "yup";
import styles from '../routes/Login.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../redux/channelsSlice";
import { Button, Container, Form as BootstrapForm } from "react-bootstrap";
import Header from "../redux/Components/Header";
import { loginUser } from "../request";
import { useTranslation } from "react-i18next";
import { naPersike } from "../../../toast/notify";


const Login = () => {
  const users = useSelector((state) => selectAllUsers(state));
const sortedUsers = users.map((item) => item.name);
  const navigate = useNavigate();
  const {t,i18n} = useTranslation()



  return (
    <>
    <Header/>
    <Container fluid >
      <h1>{t('authorization')}</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(6, "username must be at minimum 6 symbols")
            .oneOf(sortedUsers, "The user doesn't exist, try to sign up")
            .required('required field'),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .min(6, "password must be more then 6 symbols"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          setSubmitting(true);
          async function main() {
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
          //  await  createUser();
          await loginUser();
            navigate("/");
          }
          main();
        }}
      >
        <Form>
          <BootstrapForm.Label htmlFor="username">{t('username')}</BootstrapForm.Label>    
          <Field required type="username" name="username" as={BootstrapForm.Control}/>
          <ErrorMessage
            name="username"
            component="div"
            className={styles.error}
            />
            <br></br>
          <BootstrapForm.Label  htmlFor="password">{t('password')}</BootstrapForm.Label>
          <Field required type="password" name="password"  as={BootstrapForm.Control} />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
          <Button  style={{margin: '20px 0px'}} variant="outline-primary"  type="submit">{t('logIn')}</Button>
        </Form>
      </Formik>
      <hr></hr>
      <p>{t('account')}
      <a style={{textDecoration:'none'}} onClick={() => navigate('/signUp')}  href="#">{t('signUp')}</a>
      </p>
    </Container>
    </>
  );
};
export default Login;
