import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';
import { cn } from '@/lib/utils';

interface LoadingCircularProps {
  sx?: SxProps<Theme>;
}

const LoadingCircular = ({ sx }: LoadingCircularProps): JSX.Element => {
  return (
    <Box sx={{display: 'flex', ...sx}}>
      <CircularProgress className={cn('text-sky-300')} size={18} />
    </Box>
  );
}

export default LoadingCircular;