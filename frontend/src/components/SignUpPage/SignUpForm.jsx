import React, { forwardRef } from 'react';
import { Formik, Form } from 'formik';
import { Row } from 'react-bootstrap';
import validationSchema from '@utils/validationSignUpScheme';
import SignUpFields from './SignUpFields';
import SignUpImage from './SignUpImages';

const SignUpForm = forwardRef(({ handleOnSubmit }, ref) => {
  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ touched, errors }) => (
        <Form noValidate>
          <Row>
            <SignUpImage />
            <SignUpFields touched={touched} errors={errors} ref={ref} />
          </Row>
        </Form>
      )}
    </Formik>
  );
});

export default SignUpForm;
