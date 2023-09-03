import type { FC } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import type { ContactDTO, InstructionDTO, Location } from "src/types/location";
import { createLocation, updateLocation } from "src/api/locations.api";
import { mockCreateLocation,mockUpdateLocation } from "src/api/data/test.api";

interface LocationAddFormProps {
  locationProp?: Location;
  title: string;
  onSubmitSuccess: (id?: string) => void;
}

export const LocationAddForm: FC<LocationAddFormProps> = (props) => {
  const { locationProp, title, onSubmitSuccess, ...other } = props;

  const location = locationProp
    ? locationProp
    : {
        locationName: "",
        companyName: "",
        address: {
          city: "",
          state: "",
          country: "",
          postalCode: "",
        },
        contacts: [],
        instructions: [],
      };

  const formik = useFormik({
    initialValues: {
      locationName: location.locationName || "",
      companyName: location.companyName || "",
      city: location.address?.city || "",
      state: location.address?.state || "",
      country: location.address?.country || "",
      postalCode: location.address?.postalCode || "",
      contacts: location.contacts || [],
      instructions: location.instructions || [],
      submit: null,
    },

    validationSchema: Yup.object({
      locationName: Yup.string().max(255).required("Required"),
      companyName: Yup.string().max(255).required("Required"),
      city: Yup.string().max(255).required("Required"),
      state: Yup.string().max(255).required("Required"),
      country: Yup.string().max(255),
      postalCode: Yup.string().max(255).required("Required"),
      contacts: Yup.array().of(
        Yup.object().shape({
          contactName: Yup.string().required("Required"),
          contactPhone: Yup.string(),
          contactEmail: Yup.string()
            .email("Invalid email")
            .required("Required"),
          contactRole: Yup.string().required("Required"),
        })
      ),
      instructions: Yup.array().of(
        Yup.object().shape({
          instructionType: Yup.string().required("Required"),
          instructionDescription: Yup.string().required("Required"),
        })
      ),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const updatedInstructions = values.instructions.map((instruction) => ({
          ...instruction,
          instructionCreationTimestamp: new Date().toISOString(),
        }));
        const updatedValues = {
          ...values,
          instructions: updatedInstructions,
        };
        const { state, city, submit, country, postalCode, ...partialLocation } =
          updatedValues;
        const address = { state, city, country, postalCode };
        const locationData = { ...partialLocation, address };

        const res = locationProp
          ? await mockUpdateLocation(
              { ...locationData, id: locationProp.id },
              locationProp.id
            )
          : await mockCreateLocation(locationData);

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success(`Location ${locationProp ? "Updated" : "Added"}`);
        onSubmitSuccess(res.id);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title={title} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.locationName && formik.errors.locationName)
                }
                fullWidth
                helperText={
                  formik.touched.locationName && formik.errors.locationName
                }
                label="Location Name"
                name="locationName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.locationName}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.companyName && formik.errors.companyName)
                }
                fullWidth
                helperText={
                  formik.touched.companyName && formik.errors.companyName
                }
                label="Company Name"
                name="companyName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.companyName}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Typography
            style={{ paddingTop: 20, paddingBottom: 20 }}
            color="textPrimary"
            variant="h6"
          >
            Address
          </Typography>

          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.city && formik.errors.city)}
                fullWidth
                helperText={formik.touched.city && formik.errors.city}
                label="City"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label="State"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            {location.address?.country && (
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.country && formik.errors.country)}
                  fullWidth
                  helperText={formik.touched.country && formik.errors.country}
                  label="Country"
                  name="country"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
            )}
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.postalCode && formik.errors.postalCode)
                }
                fullWidth
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
                label="Postal Code"
                name="postalCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <Typography
            style={{ paddingTop: 20, paddingBottom: 20 }}
            color="textPrimary"
            variant="h6"
          >
            Contacts
          </Typography>

          {formik.values.contacts.map((_, index) => (
            <Grid container spacing={3} key={index}>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(
                      formik.touched.contacts?.[index]?.contactName &&
                      (formik.errors.contacts?.[index] as ContactDTO)
                        ?.contactName
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.contacts?.[index]?.contactName &&
                    (formik.errors.contacts?.[index] as ContactDTO)?.contactName
                  }
                  label="Contact Name"
                  name={`contacts.${index}.contactName`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.contacts[index].contactName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(
                      formik.touched.contacts?.[index]?.contactEmail &&
                      (formik.errors.contacts?.[index] as ContactDTO)
                        ?.contactEmail
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.contacts?.[index]?.contactEmail &&
                    (formik.errors.contacts?.[index] as ContactDTO)
                      ?.contactEmail
                  }
                  label="Contact Email"
                  name={`contacts.${index}.contactEmail`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.contacts[index].contactEmail}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(
                      formik.touched.contacts?.[index]?.contactPhone &&
                      (formik.errors.contacts?.[index] as ContactDTO)
                        ?.contactPhone
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.contacts?.[index]?.contactPhone &&
                    (formik.errors.contacts?.[index] as ContactDTO)
                      ?.contactPhone
                  }
                  label="Contact Phone"
                  name={`contacts.${index}.contactPhone`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts?.[index]?.contactPhone || ""}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(
                      formik.touched.contacts?.[index]?.contactRole &&
                      (formik.errors.contacts?.[index] as ContactDTO)
                        ?.contactRole
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.contacts?.[index]?.contactRole &&
                    (formik.errors.contacts?.[index] as ContactDTO)?.contactRole
                  }
                  label="Contact Role"
                  name={`contacts.${index}.contactRole`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.contacts[index].contactRole}
                />
              </Grid>

              <Grid xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    color="primary"
                    onClick={() => {
                      const newContacts = [...formik.values.contacts];
                      newContacts.splice(index, 1);
                      formik.setFieldValue("contacts", newContacts);
                    }}
                    variant="contained"
                  >
                    Remove Contact
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ))}

          <Button
            sx={{ mt: 3 }}
            color="primary"
            onClick={() => {
              if (
                formik.errors?.contacts &&
                (formik.errors?.contacts as any).some(
                  (contact: any) => contact !== undefined && contact !== ""
                )
              ) {
                toast.error(
                  "Please fix the errors before adding a new contact."
                );
              } else {
                formik.setFieldValue("contacts", [
                  ...formik.values.contacts,
                  {
                    contactName: "",
                    contactEmail: "",
                    contactPhone: "",
                    contactRole: "",
                  },
                ]);
              }

              // formik.validateForm();
            }}
            variant="contained"
          >
            Add Contact
          </Button>

          <Divider sx={{ my: 3 }} />

          <Divider sx={{ my: 3 }} />
          <Typography
            style={{ paddingTop: 20, paddingBottom: 20 }}
            color="textPrimary"
            variant="h6"
          >
            Instructions
          </Typography>

          {formik.values.instructions.map((_, index) => (
            <Grid container spacing={3} key={index}>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(
                      formik.touched.instructions?.[index]?.instructionType &&
                      (formik.errors.instructions?.[index] as InstructionDTO)
                        ?.instructionType
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.instructions?.[index]?.instructionType &&
                    (formik.errors.instructions?.[index] as InstructionDTO)
                      ?.instructionType
                  }
                  label="Instruction Type"
                  name={`instructions.${index}.instructionType`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.instructions[index].instructionType}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(
                      formik.touched.instructions?.[index]
                        ?.instructionDescription &&
                      (formik.errors.instructions?.[index] as InstructionDTO)
                        ?.instructionDescription
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.instructions?.[index]
                      ?.instructionDescription &&
                    (formik.errors.instructions?.[index] as InstructionDTO)
                      ?.instructionDescription
                  }
                  label="Instruction Description"
                  name={`instructions.${index}.instructionDescription`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={
                    formik.values.instructions[index].instructionDescription
                  }
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    color="primary"
                    onClick={() => {
                      const newInstructions = [...formik.values.instructions];
                      newInstructions.splice(index, 1);
                      formik.setFieldValue("instructions", newInstructions);
                    }}
                    variant="contained"
                  >
                    Remove Instruction
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ))}

          <Button
            sx={{ mt: 3 }}
            color="primary"
            onClick={() => {
              if (
                formik.errors?.instructions &&
                Array.isArray(formik.errors?.instructions) &&
                formik.errors?.instructions.some(
                  (instruction: string | any) =>
                    instruction !== undefined && instruction !== ""
                )
              ) {
                toast.error(
                  "Please fix the errors before adding a new instruction."
                );
              } else {
                formik.setFieldValue("instructions", [
                  ...formik.values.instructions,
                  {
                    instructionType: "",
                    instructionDescription: "",
                    instructionCreationTimestamp: new Date().toISOString(),
                  },
                ]);
              }
              formik.validateForm();
            }}
            variant="contained"
          >
            Add Instruction
          </Button>

          <Divider sx={{ my: 3 }} />
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {locationProp ? " Update" : "Add"} Location
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.locations.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

LocationAddForm.propTypes = {
  // @ts-ignore
  locationProp: PropTypes.object,
  title: PropTypes.string.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};
