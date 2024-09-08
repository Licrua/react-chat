import * as Yup from 'yup';
import i18next from 'i18next';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(20, i18next.t('validation.usernameMaxLength'))
    .min(3, i18next.t('validation.usernameMinLength'))
    .required(i18next.t('validation.requiredField'))
    .notOneOf([], i18next.t('validation.existedUser')),
  password: Yup.string()
    .max(20, i18next.t('validation.passwordMaxLength'))
    .min(6, i18next.t('validation.passwordMinLength'))
    .required(i18next.t('validation.requiredField')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], i18next.t('validation.confirmPassword'))
    .required(i18next.t('validation.requiredField')),
});

export default validationSchema;
