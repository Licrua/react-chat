// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import {
//   Button,
//   Form as BootstrapForm,
//   Col,
//   Row,
//   Image,
// } from 'react-bootstrap';
// import styles from '@styles/Login.module.scss';
// import loginIcon from '@assets/icons/login_icon.png';
// import { useTranslation } from 'react-i18next';
// import { useEffect, useMemo, useState } from 'react';

// const LoginForm = ({ onSubmitLogic }) => {
//   const { t } = useTranslation();
//   const [usersArray, setUsersArray] = useState([]);
//   useEffect(
//     () => setUsersArray(JSON.parse(localStorage.getItem('username'))),
//     [setUsersArray],
//   );

//   return (
//     <Formik
//       validateOnBlur={false}
//       validateOnChange={false}
//       initialValues={{ username: '', password: '' }}
//       validationSchema={Yup.object({
//         username: Yup.string()
//           .required(t('validation.requiredField'))
//           .oneOf([...usersArray, 'admin'], t('validation.inccorectData')),
//         password: Yup.string().required(t('validation.requiredField')),
//       })}
//       onSubmit={onSubmitLogic}
//     >
//       {({ touched, errors, handleChange, handleSubmit }) => (
//         <Form noValidate onSubmit={handleSubmit}>
//           <Row>
//             <Col sm={5}>
//               <Image src={loginIcon} width="100%" roundedCircle />
//             </Col>
//             <Col sm={5} className="d-flex flex-column justify-content-center">
//               <BootstrapForm.Group>
//                 <BootstrapForm.Label htmlFor="username">
//                   {t('nickname')}
//                 </BootstrapForm.Label>
//                 <BootstrapForm.Control
//                   autoFocus
//                   required
//                   type="text"
//                   name="username"
//                   onChange={handleChange}
//                   as={Field}
//                   isInvalid={touched.username && errors.username}
//                 />
//                 <ErrorMessage
//                   name="username"
//                   component="div"
//                   className={styles.error}
//                 />
//               </BootstrapForm.Group>
//               <BootstrapForm.Group>
//                 <BootstrapForm.Label htmlFor="password">
//                   {t('password')}
//                 </BootstrapForm.Label>
//                 <BootstrapForm.Control
//                   required
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   isInvalid={touched.password && errors.password}
//                   as={Field}
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className={styles.error}
//                 />
//               </BootstrapForm.Group>
//               <Button
//                 style={{ margin: '20px 0px' }}
//                 variant="outline-primary"
//                 type="submit"
//               >
//                 {t('logIn')}
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default LoginForm;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Form as BootstrapForm,
  Col,
  Row,
  Image,
} from 'react-bootstrap';
import styles from '@styles/Login.module.scss';
import loginIcon from '@assets/icons/login_icon.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const LoginForm = ({ onSubmitLogic }) => {
  const { t } = useTranslation();
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('username'));
    const usernames = storedUsers.map((item) => item.name);
    if (storedUsers) {
      setUsersArray(usernames);
    }
  }, []);

  console.log('usersArray', usersArray);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('validation.requiredField'))
      .oneOf(usersArray, t('validation.incorrectData')),
    password: Yup.string().required(t('validation.requiredField')),
  });

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmitLogic}
    >
      {({ touched, errors, handleChange, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col sm={5}>
              <Image src={loginIcon} width="100%" roundedCircle />
            </Col>
            <Col sm={5} className="d-flex flex-column justify-content-center">
              <BootstrapForm.Group>
                <BootstrapForm.Label htmlFor="username">
                  {t('nickname')}
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  autoFocus
                  required
                  type="text"
                  name="username"
                  onChange={handleChange}
                  as={Field}
                  isInvalid={touched.username && errors.username}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />
              </BootstrapForm.Group>
              <BootstrapForm.Group>
                <BootstrapForm.Label htmlFor="password">
                  {t('password')}
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                  as={Field}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </BootstrapForm.Group>
              <Button
                style={{ margin: '20px 0px' }}
                variant="outline-primary"
                type="submit"
              >
                {t('logIn')}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
