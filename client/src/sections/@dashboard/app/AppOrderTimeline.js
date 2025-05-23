import PropTypes from 'prop-types';

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

        <Typography fontWeight="bold">{title}</Typography>
        {subheader && (
          <Typography fontSize="sm" color="gray.500">
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
      </CardContent>
    </Card>
  );
}

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  const color =
    (type === 'order1' && blue[500]) ||
    (type === 'order2' && green[500]) ||
    (type === 'order3' && teal[500]) ||
    (type === 'order4' && orange[500]) ||
    red[500];

  return (
    <Box display="flex" alignItems="flex-start">
      <Box mr={2} display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, mt: 1 }}
        />
        {!isLast && <Box sx={{ flex: 1, width: 1, bgcolor: grey[200] }} />}
      </Box>
      <Box>


        <Typography fontWeight="medium">{title}</Typography>
        <Typography fontSize="sm" color="gray.500">

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
