import { styled } from '@mui/material/styles';


export const VirtualGrid = styled('div')({
  width: '100%',
  position: 'relative',
});

export const VirtualRow = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  gap: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const GridCell = styled('div')<{ columns: number }>(({ columns }) => ({
  flex: `0 0 calc((100% - ${(columns - 1) * GAP}px) / ${columns})`,
  minWidth: 0,
}));
export const GAP = 24;
export const ROW_HEIGHT = 300;