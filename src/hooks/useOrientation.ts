import { useEffect, useState } from 'react';

export const useOrientation = () => {

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'
  );
    
  useEffect(() => {
    setOrientation(window.innerWidth < window.innerHeight ? 'portrait' : 'landscape');
  }, [window.innerWidth ,window.innerHeight]);

  return orientation;
};