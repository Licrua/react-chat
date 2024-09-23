import { Formik, Form } from 'formik';
import { Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useSignUpSubmit from 'hooks/useSignUpSubmit';
import SignUpFields from './SignUpFields';
import SignUpImage from './SignUpImages';

const SignUpForm = () => {
  const { onSubmitLogic } = useSignUpSubmit();
  //   const dispatch = useDispatch();
  const { t } = useTranslation();
  //   const usersData = JSON.parse(localStorage.getItem('username') || []);
  //   const ArrayOfNames = usersData?.map((item) => item.name);

  //   console.log('usersArray', filtered);
  //   console.log('imp', localStorage.getItem('username'));
  //  обратить внимание на validationOnBlur и validateOnChange
  //   console.log('ArrayOfNames', ArrayOfNames);

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
        //   .notOneOf([ArrayOfNames], t('validation.existedUser')),
        password: Yup.string()
          .max(20, t('validation.passwordMaxLength'))
          .min(6, t('validation.passwordMinLength'))
          .required(t('validation.requiredField')),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], t('validation.confirmPassword'))
          .required(t('validation.requiredField')),
      })}
      onSubmit={onSubmitLogic}
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
