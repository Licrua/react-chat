import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import languageSelector from '@assets/icons/icons8-language.svg';
import changeLanguageHandler from '@utils/changeLanguage';

const HomeLanguageSelector = () => {
  const { t } = useTranslation();
  return (
    <NavDropdown
      align="end"
      className="position-absolute top-0 end-0 pt-3 pe-3"
      title={
        <img
          width="50"
          height="50"
          src={languageSelector}
          alt="languageSelector"
        />
      }
      id="basic-nav-dropdown"
    >
      <NavDropdown.Item
        href="#action/3.1"
        onClick={() => changeLanguageHandler('ru')}
      >
        {t('languages.ru')}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={() => changeLanguageHandler('en')}
        href="#action/3.2"
      >
        {t('languages.en')}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default HomeLanguageSelector;
