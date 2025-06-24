import * as React from 'react';
import MuiGrid from '@mui/material/Grid';
import type { GridProps } from '@mui/material/Grid';

const CustomGrid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <MuiGrid ref={ref} {...props} />;
});

CustomGrid.displayName = 'CustomGrid';

export default CustomGrid;
