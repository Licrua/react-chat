import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAllChannels } from '../channelsSlice';

const DropdownComponent = () => {
  const channels = useSelector(selectAllChannels);
  console.log('channels', channels);
  return (
    <ul>
      {channels.map((item) => (
        <Dropdown as={ButtonGroup} key={item.id}>
          <Button variant="success">{item.name}</Button>
          <Dropdown.Toggle
            split
            variant="success"
            id={`dropdown-split-${item.id}`}
          />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ))}
    </ul>
  );
};

// const SplitBasicExample = () => {
//   return (
//     <Stack gap={3}>
//       <DropdownComopnent />
//       <DropdownComopnent />
//       <DropdownComopnent />
//     </Stack>
//   );
// };

export default DropdownComponent;
