import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import React from "react";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import FlexBetween from "components/FlexBetween";

export default function LoginPage() {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();

  return (
    <Box>
      <FlexBetween>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
          display="flex"
          justifyContent="space-between"
        >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            sx={{
              flexGrow: 1,
            }}
          >
            FriendZone
          </Typography>

          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
        </Box>
      </FlexBetween>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          textAlign="center"
          fontWeight="500"
          variant="h4"
          sx={{ mb: "1.5rem" }}
        >
          Welcome to FriendZone, a place for sharing! 🌱
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}
