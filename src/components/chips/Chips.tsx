import { useContext } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import LocationContext from '../../context/location-context';
import { LocationContextType } from '../../interfaces/location-context';

// import modules from './Chips.module.css';

const Chips = () => {
  const ctx = useContext<LocationContextType>(LocationContext);

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      {ctx.locationsHistory.map(location => (
        <Chip key={location.id}
          label={location.city}
          onClick={handleClick}
          onDelete={handleDelete}
        />
      ))}
    </Stack>
  );
}

export default Chips;