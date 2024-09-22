import { Formik, Form } from 'formik';
import { Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import SignUpFields from './SignUpFields';
import SignUpImage from './SignUpImages';

const SignUpForm = ({ handleOnSubmit }) => {
  const { t } = useTranslation();
  const usersData = JSON.parse(localStorage.getItem('username'));
  console.log('usersData', usersData);

  //   const filtered = usersArray.map((item) => item.username);
  //   console.log('usersArray', filtered);
  //   console.log('imp', localStorage.getItem('username'));
  //  обратить внимание на validationOnBlur и validateOnChange

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .max(20, t('validation.usernameMaxLength'))
          .min(3, t('validation.usernameMinLength'))
          .required(t('validation.requiredField')),
        //   .notOneOf([usersArray], t('validation.existedUser')),
        password: Yup.string()
          .max(20, t('validation.passwordMaxLength'))
          .min(6, t('validation.passwordMinLength'))
          .required(t('validation.requiredField')),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], t('validation.confirmPassword'))
          .required(t('validation.requiredField')),
      })}
      onSubmit={handleOnSubmit}
    >
      {({ touched, errors }) => (
        <Form noValidate>
          <Row>
            <SignUpImage />
            <SignUpFields touched={touched} errors={errors} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
