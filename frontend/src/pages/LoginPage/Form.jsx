import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

//////////////////////////////////////
const registerSchema = yup.object().shape({
  firstName: yup.string().required("lala required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// register driven by formik
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  // formData.append("picturePath", values.picture.name) --> we will change the name "picture" to "picturePath"
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const mode = useSelector((state) => state.mode);
  const isDark = mode === "dark" ? true : false;

  // 得到的是 true or false
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const login = async (values, onSumbitProps) => {
    try {
      const loggedInResponse = await axios.post(
        "http://localhost:3001/auth/login",
        values
        // 下面 {} 包的这一坨 就是 req.body in backend
        // {
        //   // to indicate the data sent in the req body is formatted as JSON.  axios发送可以不用设置json的header，会自动帮忙设置
        //   Headers: { "Content-Type": "application/json" },
        // }
      );
      console.log(loggedInResponse);
      const loggedIn = loggedInResponse.data;
      console.log(loggedIn);
      onSumbitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.userLogin,
            token: loggedIn.token,
          })
        );
      }
      navigate("/home");
    } catch (error) {}
  };

  // values 的结构 和 initialvalues的结构差不多
  // onSubmitProps or just simple destruct it: e.g. async(values, {resetForm}) => {.....}
  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);

      console.log(formData);

      const savedUserResponse = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Submit
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      // choose initial value
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      // choose Schema
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0, 1fr))"
            sx={{
              // 如果是小屏幕的话，后面的每一个div/input... 都占4个 grid
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiFormHelperText-root": {
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1.2rem",
                    },
                  }}
                ></TextField>
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiFormHelperText-root": {
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1.2rem",
                    },
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiFormHelperText-root": {
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1.2rem",
                    },
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiFormHelperText-root": {
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1.2rem",
                    },
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        px="1rem"
                        borderRadius="10px"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p style={{ fontSize: "1.2rem" }}>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography fontSize="1.2rem">
                              {values.picture.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* Login Page */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              size="big"
              sx={{
                gridColumn: "span 4",

                "& .MuiFormHelperText-root": {
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
                "& .MuiFormHelperText-root": {
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.2rem",
                },
              }}
            />
          </Box>
          {/* buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                // textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  opacity: 0.8,
                  //   transition: "opacity 1s ease",
                },
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              {isLogin
                ? "Don't have an accout? Sign up here. 🐣 "
                : "Already have an account? Login here. 👻"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default Form;
