export const suggestOutdoors = (description: string): string => {
  if (
    description === 'clear sky' || 
    description === 'few clouds'
  ) {
    return 'Great';
  } else if (
    description === 'scattered clouds' ||
    description === 'broken clouds'
  ) {
    return 'Good';
  } else if (
    description === 'shower rain' ||
    description === 'mist'
  ) {
    return 'Fair';
  } else {
    return 'Poor';
  };
}

export const suggestUmbrellaNeed = (description: string): string => {
  if (description === 'clear sky') {
    return 'No need';
  } else if (
    description === 'few clouds' ||
    description === 'scattered clouds'
  ) {
    return 'Likely no need';
  } else if (
    description === 'broken clouds' ||
    description === 'mist'
  ) {
    return 'Likely needed';
  } else if (
    description === 'shower rain' ||
    description === 'snow'
  ) {
    return 'Need';
  } else {
    return 'Must';
  };
}

export const suggestClothing = (temp: number): string => {
  const windChill = suggestWindChill(temp);
  const heatStroke = suggestHeatStroke(temp);

  if (windChill === 'Extreme Danger' || heatStroke === 'Extreme Danger') {
    return 'Heavy coat';
  } else if (windChill === 'Danger' || heatStroke === 'Danger') {
    return 'Light jacket';
  } else if (windChill === 'Extreme Caution' || heatStroke === 'Extreme Caution') {
    return 'Long sleeves';
  } else if (windChill === 'Caution' || heatStroke === 'Caution') {
    return 'Breathable clothing';
  } else {
    return 'Shorts';
  }
};

export const suggestDrivingSafety = (visibility: number): string => {
  if (visibility < 50) {
    return 'Extremely dangerous';
  } else if (visibility >= 50 && visibility < 200) {
    return 'Extreme caution';
  } else if (visibility >= 200 && visibility < 500) {
    return 'Caution';
  } else if (visibility >= 500 && visibility < 700) {
    return 'Fair';
  } else if (visibility >= 700 && visibility < 1000) {
    return 'Fair';
  } else {
    return 'Great';
  }
};

export const suggestWindChill = (temp: number): string => {
  if (temp < 243.26) {
    return 'Extreme Danger';
  } else if (temp >= 243.26 && temp < 258.15) {
    return 'Danger';
  } else if (temp >= 258.15 && temp < 268.15) {
    return 'Extreme Caution';
  } else if (temp >= 268.15 && temp < 278) {
    return 'Caution';
  } else {
    return 'Safe';
  };
}

export const suggestHeatStroke = (temp: number): string => {
  if (temp >= 314.15) {
    return 'Extreme Danger';
  } else if (temp >= 311.15 && temp < 314.15) {
    return 'Danger';
  } else if (temp >= 308.15 && temp < 311.15) {
    return 'Extreme Caution';
  } else if (temp >= 305.15 && temp < 308.15) {
    return 'Caution';
  } else {
    return 'Safe';
  };
}