import React, { ReactNode, useCallback, useContext, useState } from "react";
import { createContext } from "react";

interface IdrawerContextdata {
  isDrawerOpen: boolean;
  draweroptions: Idraweroptions[];
  toggleDrawerOpen: () => void;
  setdraweroptions: (newdraweroption: Idraweroptions[]) => void;
}

interface childrenprop {
  children: ReactNode;
}

interface Idraweroptions {
  path: string;
  icon: string;
  label: string;
}

const DrawerContext = createContext({} as IdrawerContextdata);

export const useDrawercontext = () => {
  return useContext(DrawerContext);
};

export const AppDrawerprovider: React.FC<childrenprop> = ({ children }) => {
  const [isDrawerOpen, setIsdraweropen] = useState(false);
  const [draweroptions, setdraweroptions] = useState<Idraweroptions[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsdraweropen((prev) => !prev);
  }, []);

  const handlesetdraweroptions = useCallback(
    (newdraweroptions: Idraweroptions[]) => {
      setdraweroptions(newdraweroptions);
    },
    []
  );

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        draweroptions,
        toggleDrawerOpen,
        setdraweroptions: handlesetdraweroptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
