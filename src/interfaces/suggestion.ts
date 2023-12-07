import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface SuggestionProps {
  icon: IconProp;
  title: string;
  description: string,
  isLoading: boolean
}