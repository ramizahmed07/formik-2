import React from "react";
import { Formik, Field, Form, useField } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel
} from "@material-ui/core";
import * as yup from "yup";

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      {...field}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10)
});

function App() {
  return (
    <div className="App" style={{ padding: "20px 30px" }}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          //make async call
          console.log("DATA", data);
          setSubmitting(false);
          // resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <MyTextField
                placeholder="first name"
                type="input"
                name="firstName"
              />
            </div>
            <div>
              <Field
                placeholder="last name"
                type="input"
                name="lastName"
                as={TextField}
              />
            </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />
            <div>Cookies:</div>
            <Field
              name="cookies"
              as={Checkbox}
              type="checkbox"
              value="ChocolateChip"
            />
            <Field
              name="cookies"
              as={Checkbox}
              type="checkbox"
              value="Blueberry"
            />
            <Field
              name="cookies"
              as={Checkbox}
              type="checkbox"
              value="ChocolateFudge"
            />
            <div>Yogurt: </div>
            <MyRadio name="yogurt" value="peach" type="radio" label="Peach" />
            <MyRadio name="yogurt" value="mango" type="radio" label="Mango" />
            <MyRadio name="yogurt" value="apple" type="radio" label="Apple" />

            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
