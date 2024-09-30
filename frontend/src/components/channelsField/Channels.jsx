import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonGroup,
  Dropdown,
  SplitButton,
  Stack,
} from 'react-bootstrap';
import styles from '@styles/Channels.module.scss';
import {
  selectAllChannels,
  setCurrentChannel,
  setCurrentChannelId,
} from '@slices/channelsSlice';
import {
  setToggleId,
  setRemoveToggler,
  setRenameToggler,
  setCurrentId,
  setAddToggler,
} from '@slices/popUpSlice';
import { motion } from 'framer-motion';
import CombinedPopUp from '../popUpLogic/CombinedPopUp';
import ChannelDropdowns from './ChannelsDropdowns';
import ChannelButtons from './ChannelsButtons';
import ChannelsHeader from './ChannelsHeader';
import ChannelsList from './ChannelsList';

const Channels = () => {
  return (
    <>
      <CombinedPopUp />
      <div className={`border border-1 ${styles.chat_channels}`}>
        <ChannelsHeader />
        <div className="border border-1" />

        <ChannelsList />
      </div>
    </>
  );
};

export default Channels;
