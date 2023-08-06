import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  InputLabel,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FlexBetween from "./FlexBetween";

import { setMode } from "state";

export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  // width >= 1000px : true
  // width <  1000px : false
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fullName = "Li Qiang";

  // theme color
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              // color: primaryLight,
              cursor: "pointer",

              transition: "color 0.3s ease, opacity 0.3s ease", // Apply transitions on hover
              opacity: 0.8, // Set initial opacity to 1 and transition it on hover
            },
          }}
        >
          FriendZone
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DeskTop version */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            {/* <InputLabel>{fullName}</InputLabel> */}
            <Select
              input={<InputBase />}
              sx={{ width: "150px" }}
              label={fullName}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => {}}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/*  mobile nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bottom="0"
          backgroundColor={background}
        >
          {/* close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <InputLabel>{fullName}</InputLabel>
              <Select
                input={<InputBase />}
                sx={{ width: "150px" }}
                label={fullName}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {}}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}
