import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Regiter() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("You must input a title"),
    password: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Ex. John.."
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            name="password"
            type="password"
            placeholder="password.."
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Regiter;
