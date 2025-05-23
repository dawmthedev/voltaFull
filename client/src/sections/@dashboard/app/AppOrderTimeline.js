import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Stack, Circle } from '@chakra-ui/react';
import { Box, Typography } from '@mui/material';
import { fDateTime } from '../../../utils/formatTime';

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader>
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        {subheader && (
          <Typography variant="body2" color="text.secondary">
            {subheader}
          </Typography>
        )}
      </CardHeader>
      <CardBody>
        <Stack>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  const color =
    (type === 'order1' && 'blue.500') ||
    (type === 'order2' && 'green.500') ||
    (type === 'order3' && 'teal.500') ||
    (type === 'order4' && 'orange.500') ||
    'red.500';

  return (
    <Box display="flex" alignItems="flex-start">
      <Box mr={2} display="flex" flexDirection="column" alignItems="center">
        <Circle size="8px" bg={color} mt={2} />
        {!isLast && <Box flex="1" w="1px" bg="gray.200" />}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {fDateTime(time)}
        </Typography>
      </Box>
    </Box>
  );
}

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};
