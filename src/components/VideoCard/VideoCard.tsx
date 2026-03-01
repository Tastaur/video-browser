import { Typography } from '@mui/material';

import { StyledCard, CardImage, StyledCardContent } from './styles';
import type { VideoCardProps } from './types';


export const VideoCard = ({ title, artist, year, imageUrl }: VideoCardProps) => (
  <StyledCard data-testid="video-card">
    <CardImage src={imageUrl} alt={title} data-testid="video-card-image" />
    <StyledCardContent data-testid="video-card-content">
      <Typography variant="body1" data-testid="video-card-title">{title}</Typography>
      <Typography variant="body1" data-testid="video-card-artist">{artist}</Typography>
      <Typography variant="body1" data-testid="video-card-year">{year}</Typography>
    </StyledCardContent>
  </StyledCard>
);
