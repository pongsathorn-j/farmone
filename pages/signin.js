import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Typography,
  CssBaseline,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { getSession, getCsrfToken, signIn } from "next-auth/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";

//validate
const schema = yup
  .object({
    userId: yup.string().trim().required(),
    password: yup.string().trim().required().min(8, "minimum 8 charactor"),
  })
  .required();

const SignIn = ({ csrfToken }) => {
  const router = useRouter();
  const session = getSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const onSubmit = async (data) => {
    const res = await fetch("/api/auth/callback/credentials", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.redirected && res.url && session) {
      signIn();
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/assets/images/imagelogin.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 0 0 1000px rgb(52 197 178 / 75%)",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              // action="/api/auth/callback/credentials"
              sx={{ mt: 1 }}
            >
              <TextField
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
                {...register("csrfToken")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="userId"
                label="User"
                name="userId"
                {...register("userId")}
                error={!!errors.userId}
                helperText={errors.userId?.message}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;

SignIn.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
