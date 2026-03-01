import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';


export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.custom.cardContentBg,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const CardImage = styled('img')({
  height: 180,
  width: '100%',
  objectFit: 'fill',
});

export const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});
