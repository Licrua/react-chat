import React from 'react';
import { Image, Col } from 'react-bootstrap';
import SignUpIcon from '@assets/icons/reg_confirm_email_with_button_0.png';

const SignUpImage = () => (
  <Col xs={5} lg={4}>
    <Image src={SignUpIcon} fluid roundedCircle />
  </Col>
);

export default SignUpImage;
