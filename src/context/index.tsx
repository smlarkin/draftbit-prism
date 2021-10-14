import { createContext, useState, ReactNode, useContext } from 'react';

import { BorderBoxAttribute } from '../types';
import { defaultBorderBoxAttributes } from '../constants';

const AttributesContext = createContext(null);

type AttributesProviderProps = {
  children: ReactNode;
};

export const AttributesProvider = ({ children }: AttributesProviderProps) => {
  const value = useState(defaultBorderBoxAttributes);
  /* NOTE
  this useState hook could be used here to persist state changes
  with a useEffect hook the subscribes to to value[0] and sends changes along to an API ...
  possibly with a debounce or with GraphQL we might choose an optimic UI path :)
  */

  return (
    <AttributesContext.Provider value={value as typeof createContext.arguments}>
      {children}
    </AttributesContext.Provider>
  );
};

export const useAttributes = () => {
  const context = useContext(AttributesContext);

  if (context === undefined) {
    throw new Error('useAttributes must be used within a AttributesProvider');
  }
  return context as unknown as [
    BorderBoxAttribute[],
    React.Dispatch<React.SetStateAction<BorderBoxAttribute[]>>,
  ];
};
