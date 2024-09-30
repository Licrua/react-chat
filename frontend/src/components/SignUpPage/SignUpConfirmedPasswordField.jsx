const SignUpConfirmedPasswordField = ({ touched, errors }) => {
  return (
    <BootstrapForm.Group>
      <BootstrapForm.Label htmlFor="confirmPassword">
        {t('signUpFields.confirmPassword')}
      </BootstrapForm.Label>
      <BootstrapForm.Control
        as={Field}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
      />
      <ErrorMessage
        name="confirmPassword"
        component="div"
        className={styles.error}
      />
    </BootstrapForm.Group>
  );
};
