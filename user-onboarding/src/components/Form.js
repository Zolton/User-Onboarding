import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        {touched.username && errors.username && <p>{errors.username}</p>}
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <Field name="name" type="name" placeholder="Enter username" />
      <Field name="email" type="email" placeholder="Enter email" />
      <Field name="password" type="password" placeholder="Enter password" />
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
      </label>
      <button>Submit Form</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationScheme: Yup.object.shape({
    name: Yup.string()
      .name("Name is not valid")
      .required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytake@asdfasdf.com") {
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
