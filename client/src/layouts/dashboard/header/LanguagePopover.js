import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const LANGS = [
  {
    value: 'en',
    label: 'CRM',
    icon: '/assets/Statuses/crm.png',
  },
  {
    value: 'de',
    label: 'Website',
    icon: '/assets/Statuses/website.png',
  },
];

export default function LanguagePopover() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onClose} placement="bottom-end">
      <MenuButton
        as={IconButton}
        onClick={onOpen}
        p={0}
        w="44px"
        h="44px"
        bg={isOpen ? (theme) => alpha(theme.palette.primary.main, 0.12) : undefined}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </MenuButton>
      <MenuList p={1} mt={1.5} ml={0.75} w="180px">
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} onClick={onClose} isDisabled={option.value === LANGS[0].value}>
              <Box as="img" alt={option.label} src={option.icon} w={28} mr={2} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuList>
    </Menu>
  );
}
