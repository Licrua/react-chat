import { NavDropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';
import secondaryInfoIcon from '@assets/icons/icons8-contact-info-96.png';
import { useTranslation } from 'react-i18next';

const HeaderSecondaryInfo = () => {
  const { t } = useTranslation();
  return (
    <NavDropdown
      align="end"
      className="mx-5"
      title={
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          width="40"
          height="40"
          src={secondaryInfoIcon}
          alt="secondary_info_icon"
        />
      }
      id="basic-nav-dropdown"
    >
      <NavDropdown.Item href="#action/3.1">
        {t('secondaryInfo.authorInfo')}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.2">
        {t('secondaryInfo.projectInfo')}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default HeaderSecondaryInfo;
