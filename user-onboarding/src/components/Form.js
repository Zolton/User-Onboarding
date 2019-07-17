import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <div />
      <div>
      <Field name="name" type="text" placeholder="Enter username" /></div>
      {touched.name && errors.name && <p>{errors.name}</p>}
      <div><Field name="email" type="email" placeholder="Enter email" /></div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <div><Field name="password" type="password" placeholder="Enter password" /></div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} /><h4>Agree with the TOS?</h4>
      </label>
      <div><Field component="select" name="destroyer">
        <option value="default">Choose The Form Of Your Destroyer</option>
        <option value="marshmallow">Marshmallow man</option>
        <option value="demon-dog">Demon dog</option>
        <option value="peter">Peter Venkman</option>
        <option value="ray">Raymond Stantz</option>
        <option value="egon">Egon Spengler</option>
        <option value="winston">Winston Zeddemore</option>
      </Field></div>
      <button>Submit Form</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, tos, destroyer }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      destroyer: destroyer || "default"
    };
  },

  validationScheme: Yup.object().shape({
    name: Yup.string()
      //.name("Name is not valid")
      .required("Name is required")
      .max(10, "10 characters maximum"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      //.password("Password is not valid")
      .min(8, "At least 8 characters are required")
      .required("Password is required"),
    destroyer: Yup.object()
        .required("You Can(Not) Proceed"),
    tos: Yup.boolean()
        .required(true)
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
          window.alert("SERVER RESPONSE GOES HERE");
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;
