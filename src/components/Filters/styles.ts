import { styled } from '@mui/material/styles';
import { TextField, Autocomplete } from '@mui/material';


export const FiltersContainer = styled('section')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

export const StyledTextField = styled(TextField)({
  width: 250,
});

export const StyledAutocomplete = styled(Autocomplete)({
  width: 250,
  '& .MuiInputBase-root': {
    height: 56,
  },
}) as typeof Autocomplete;
