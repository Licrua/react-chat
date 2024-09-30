const SignUpPasswordField = ({ touched, errors }) => {
  return (
    <BootstrapForm.Group>
      <BootstrapForm.Label htmlFor="password">
        {t('signUpFields.password')}
      </BootstrapForm.Label>
      <BootstrapForm.Control
        as={Field}
        type="password"
        name="password"
        id="password"
        isInvalid={touched.password && !!errors.password}
      />
      <ErrorMessage name="password" component="div" className={styles.error} />
    </BootstrapForm.Group>
  );
};

export default SignUpPasswordField;
