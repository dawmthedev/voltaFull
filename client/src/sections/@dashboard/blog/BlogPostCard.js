import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BlogPostCard({ post, index, link }) {
  const { cover, title } = post;
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Link to={link} target="_blank" style={{ textDecoration: 'none' }}>
        <Card>
          <CardMedia component="img" image={cover} alt={title} />
          <CardContent>
            <Typography variant="subtitle2" color="textPrimary">
              {title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  link: PropTypes.string,
};
