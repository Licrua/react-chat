import { Formik, Form, Field } from "formik";

const Login = () => {
  return (
    <>
      <p>Форма</p>
      <Formik initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log('values', values);
      }}>
        <Form>
            <Field type='email' name='email'>
            </Field>
            <Field type='password' name='password'></Field>
            <button type="submit">Отправить</button>
        </Form>
      </Formik>
    </>
  );
};
export default Login;
