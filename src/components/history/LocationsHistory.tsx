import { Fragment, forwardRef, useContext, useState } from 'react';

import LocationContext from '../../context/location-context';
import useTheme from '../../hooks/useTheme';
import { LocationContextType } from '../../interfaces/location-context';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import modules from './LocationsHistory.module.css';


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LocationsHistory: React.FC = () => {
  const ctx = useContext<LocationContextType>(LocationContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const theme = useTheme();

  const addLocationHandler = (city: string) => {
    ctx.onChangeLocation(city);
  };

  const deleteLocationHandler = (id: string) => {
    ctx.onDeleteLocation(id);

    if (ctx.locationsHistory.length !== 1) {
      setIsSnackbarOpen(true);
    } 
  };

  const closeSnackbarHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  return (
    <Fragment>
      <Stack direction="row" spacing={1} className={`${modules.stack} ${modules[theme]}`}>
        {ctx.locationsHistory.map(location => (
          <Chip key={location.id}
            label={location.city}
            className={modules.chip}
            onClick={() => addLocationHandler(location.city)}
            onDelete={() => deleteLocationHandler(location.id)}
          />
          ))}
      </Stack>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={closeSnackbarHandler}>
        <Alert onClose={closeSnackbarHandler} severity="error" sx={{ width: '100%' }}>
          The city has been removed
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default LocationsHistory;