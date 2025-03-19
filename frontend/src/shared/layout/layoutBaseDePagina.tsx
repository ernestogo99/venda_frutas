import { Menu } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactNode } from "react";
import { useDrawercontext } from "../contexts/drawercontext";

interface Ilayoutbaseprop {
  children: ReactNode;
  titulo: string;
  barradeferramentas?: ReactNode;
}

export const Layoutbasedepagina: React.FC<Ilayoutbaseprop> = ({
  children,
  titulo,
  barradeferramentas,
}) => {
  const { toggleDrawerOpen } = useDrawercontext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Menu></Menu>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {titulo}
        </Typography>
      </Box>
      {barradeferramentas && <Box>{barradeferramentas}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
