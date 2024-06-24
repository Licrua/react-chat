import styles from "../routes/SignUp.module.css";
import { Button, Form as BootstrapForm, Container } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { newUser, loginUser } from "../request";
import Header from "../redux/Components/Header";
import { addUser, selectAllUsers } from "../redux/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";


const SignUp = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation()
  const navigate = useNavigate();
  const users = useSelector((state) => selectAllUsers(state));
  const sortedUsers = users.map((item) => item.name);
  console.log("sortedUsers", sortedUsers);
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(20, "max lenght is 20 characters")
      .min(3, "min 3 characters")
      .required("username is required")
      .notOneOf(sortedUsers, "this username has already created"),
    password: Yup.string()
      .max(20, "max length is  20 characters")
      .min(6, "Password must be at least 6 characters")
      .required("password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "the passwords should be the same",
    )
    .required('necessary field'),
  });

  console.log("SignUp users", users);
  return (
    <Container fluid className={styles.container}>
      <Header />
      <h1 style={{ fontFamily: "cursive", fontWeight: "900", padding: "10px" }}>
        {t('registration')}
      </h1>
      <Formik
        initialValues={{ username: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values, "signUp values");
          newUser(values.username, values.password);
          dispatch(addUser({ id: _.uniqueId(), name: values.username }));
          //  dispatch(addUser(values.username))
          //  loginUser(values.username, values.password)
          navigate("/");
        }}
      >
        <Form>
          <BootstrapForm.Group>
            <BootstrapForm.Label>{t('username')}</BootstrapForm.Label>
            <Field type="text" name="username" as={BootstrapForm.Control} />
            <ErrorMessage
              name="username"
              component="div"
              className={styles.error}
            />
          </BootstrapForm.Group>
          <BootstrapForm.Group>
            <BootstrapForm.Label>{t('password')}</BootstrapForm.Label>
            <Field type="password" name="password" as={BootstrapForm.Control} />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </BootstrapForm.Group>
          <BootstrapForm.Group>
            <BootstrapForm.Label>{t('confirmPassword')}</BootstrapForm.Label>
            <Field
              type="password"
              name="confirmPassword"
              as={BootstrapForm.Control}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={styles.error}
            />
          </BootstrapForm.Group>
          <Button
            style={{ margin: "10px 0px" }}
            variant="primary"
            type="submit"
          >
            {t('registrate')}
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};
export default SignUp;
