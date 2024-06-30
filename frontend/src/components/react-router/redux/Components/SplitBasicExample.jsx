import { Dropdown, ButtonGroup, Button, Stack } from 'react-bootstrap';

const DropdownComopnent = () => {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="success">Split Button</Button>
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const SplitBasicExample = () => {
  return (
    <Stack gap={3}>
      <DropdownComopnent />
      <DropdownComopnent />
      <DropdownComopnent />
    </Stack>
  );
};

export default SplitBasicExample;
