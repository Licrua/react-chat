import { useDispatch } from 'react-redux';

const {
  setConcurrentChannel,
  setConcurrentChannelId,
} = require('@slices/channelsSlice');
const { Button } = require('react-bootstrap');

const ChannelButtons = ({ item }) => {
  const dispatch = useDispatch();
  const handleChannelClick = (channel) => {
    dispatch(setConcurrentChannel(channel.name));
    dispatch(setConcurrentChannelId(channel.id));
  };

  return (
    <Button
      key={item.id}
      variant="secondary"
      onClick={() => handleChannelClick(item)}
      className="d-flex flex-shrink-0 rounded-0"
    >
      {item.name.length >= 8
        ? `# ${item.name.slice(0, 8)}...`
        : `# ${item.name}`}
    </Button>
  );
};

export default ChannelButtons;
