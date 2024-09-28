import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FooterNavigation = () => {
  const { t } = useTranslation();
  const navLinks = [
    {
      path: 'https://github.com/Licrua',
      label: t('footer.author'),
      id: 0,
    },
    {
      path: 'https://github.com/Licrua/react-chat',
      label: t('footer.project'),
      id: 1,
    },
    {
      path: 'https://github.com/Licrua#%D1%81%D0%B2%D1%8F%D0%B7%D1%8C-%D1%81%D0%BE-%D0%BC%D0%BD%D0%BE%D0%B9',
      label: t('footer.contacts'),
      id: 2,
    },
  ];
  return (
    <Nav variant="underline" className="d-flex justify-content-center ">
      {navLinks.map((item) => (
        <Nav.Link
          className="text-secondary"
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
          href={item.path}
        >
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default FooterNavigation;
