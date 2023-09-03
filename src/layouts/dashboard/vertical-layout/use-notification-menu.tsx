import { useCallback, useEffect, useState } from 'react';

import { usePathname } from 'src/hooks/use-pathname';

export const useNotificationMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const handlePathnameChange = useCallback(
    (): void => {
      if (open) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );


  

const handleToggle = useCallback(
    (): void => {
        console.log('handleToggle');
        setOpen(!open);
    },  
    [open]
    );





  return {
    handleToggle,
    open
  };
};
