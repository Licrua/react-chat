const SignUpUsernameField = () => {
  return (
	<BootstrapForm.Group>
	<BootstrapForm.Label htmlFor="username">
	  {t('signUpFields.username')}
	</BootstrapForm.Label>
	<BootstrapForm.Control
	  autoFocus
	  as={Field}
	  type="text"
	  name="username"
	  id="username"
	  isInvalid={touched.username && !!errors.username}
	/>
	<ErrorMessage
	  name="username"
	  component="div"
	  className={styles.error}
	/>
  )
}

export default SignUpUsernameField;
