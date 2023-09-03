import { useState, type FC } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import {
  TextField,
  Switch,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import * as Yup from "yup";
import { User } from "src/types/user";
import { updateUser, createUser } from "src/api/users.api";


interface UserEditProps {
  onCancel: () => void;
  onSave: () => void;
  user: User;
}
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters"),
  country: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
});

export const UserEdit: FC<UserEditProps> = (props) => {
  const { onCancel, onSave, user } = props;
  const [submitting,setSubmitting]= useState(false);


  const isUserNull = Object.values(user).every((value) => value === "");

  const formik = useFormik({
    initialValues: {
      username: user.username || "",
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      city: user.address.city || "",
      state: user.address.state || "",
      country: user.address.country || "",
      password: user.password || "",
      postalCode: user.address.postalCode || "",
      isAdminUser: user.isAdminUser || false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      // console.log(values);
      const address = {
        city: values.city,
        state: values.state,
        country: values.country,
        postalCode: values.postalCode,
      };
      if (isUserNull) {
      //  const res= //create user
        try {
          const response =  await createUser({
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            address: address,
            password: values.password,
          });
          onCancel();
          formik.resetForm();
          // Handle the response...
        } catch (error) {
          console.log(error);
          // if (error.aborted) {
          //   console.log("Request aborted");
          //   // Handle abort...
          // } else {
          //   // Handle other errors...
          // }
        }
        setTimeout(()=>{setSubmitting(false)},500);
      } else {
      
        try {
          await updateUser({
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            address: address,
            isAdminUser: values.isAdminUser,
            userId: user.id,
            //  password:values.password,
            //  id:user.id
          });
          onCancel();
          formik.resetForm();
          // Handle the response...
        } catch (error) {
          console.log(error);
          // if (error.aborted) {
          //   console.log("Request aborted");
          //   // Handle abort...
          // } else {
          //   // Handle other errors...
          // }
        }
      }
      setTimeout(()=>{setSubmitting(false)},500);
      // onSave();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={6}>
        <Stack spacing={3}>
          <Typography variant="h6">User Details</Typography>
          <Stack spacing={3}>
            <TextField
              disabled={!isUserNull}
              fullWidth
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            {isUserNull && (
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            )}
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={
                formik.touched.city && formik.errors.city
                  ? String(formik.errors.city)
                  : ""
              }
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={
                formik.touched.state && formik.errors.state
                  ? String(formik.errors.state)
                  : ""
              }
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={
                formik.touched.country && formik.errors.country
                  ? String(formik.errors.country)
                  : ""
              }
            />
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              error={
                formik.touched.postalCode && Boolean(formik.errors.postalCode)
              }
              helperText={
                formik.touched.postalCode && formik.errors.postalCode
                  ? String(formik.errors.postalCode)
                  : ""
              }
            />

            {/* <TextField
            fullWidth
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={user.status}
          >
            {statusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField> */}
          </Stack>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Make User Admin
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  This user will have admin permissions.
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isAdminUser}
                color="primary"
                edge="start"
                name="isAdminUser"
                onChange={formik.handleChange}
              />
            </Stack>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={2}
          >
            <Button
              color="primary"
              type="submit"
              disabled={submitting}
              size="small"
              variant="contained"
            >
              {isUserNull?"Create":"Update User"}
            </Button>
            <Button color="inherit" onClick={onCancel} size="small">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

UserEdit.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  // @ts-ignore
  user: PropTypes.object,
};
