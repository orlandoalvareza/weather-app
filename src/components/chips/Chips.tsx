import { useContext } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import LocationContext from '../../context/location-context';
import { LocationContextType } from '../../interfaces/location-context';

// import modules from './Chips.module.css';

const Chips = () => {
  const ctx = useContext<LocationContextType>(LocationContext);

  const handleClick = (city: string) => {
    ctx.onChangeLocation(city);
  };

  const handleDelete = (id: string) => {
    ctx.onDeleteLocation(id);
  };

  return (
    <Stack direction="row" spacing={1}>
      {ctx.locationsHistory.map(location => (
        <Chip key={location.id}
          label={location.city}
          onClick={() => handleClick(location.city)}
          onDelete={() => handleDelete(location.id)}
        />
      ))}
    </Stack>
  );
}

export default Chips;