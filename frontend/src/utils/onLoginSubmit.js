import authorizeUser from './loginOnSubmitLogic';

const onSubmitLogic = async (values, { setSubmitting }) => {
  setSubmitting(true);
  try {
    await authorizeUser(values);
    navigate('/');
  } catch (error) {
    console.error('Authorization error:', error);
  } finally {
    setSubmitting(false);
  }
};

export default onSubmitLogic;
