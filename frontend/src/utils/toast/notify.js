import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successfullyCreatedChannel = () => {
  toast.success(window.i18n.t('successfullyCreatedChannel'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};

export const successfullyRenamedChannel = () => {
  toast.success(window.i18n.t('successfullyRenamedChannel'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};

export const successfullyDeletedChannel = () => {
  toast.success(window.i18n.t('successfullyDeletedChannel'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};

export const errorOnRequest = () => {
  toast.error(window.i18n.t('errorOnRequest'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};
