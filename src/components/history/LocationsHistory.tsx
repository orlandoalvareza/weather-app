import { useContext } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import LocationContext from '../../context/location-context';
import { LocationContextType } from '../../interfaces/location-context';

import modules from './LocationsHistory.module.css';

const LocationsHistory: React.FC = () => {
  const ctx = useContext<LocationContextType>(LocationContext);

  const addLocationHandler = (city: string) => {
    ctx.onChangeLocation(city);
  };

  const deleteLocationHandler = (id: string) => {
    ctx.onDeleteLocation(id);
  };

  return (
    <Stack direction="row" spacing={1} className={modules.stack}>
      {ctx.locationsHistory.map(location => (
        <Chip key={location.id}
          label={location.city}
          className={modules.chips}
          onClick={() => addLocationHandler(location.city)}
          onDelete={() => deleteLocationHandler(location.id)}
        />
      ))}
    </Stack>
  );
}

export default LocationsHistory;