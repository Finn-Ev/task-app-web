import { useState, useEffect } from "react";

export const useAuthForm = (
  validationSuccessHandler,
  validateForm,
  operation
) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(formData));
    setSubmitted(true);
  };

  useEffect(() => {
    if (operation === "register") {
      if (
        !errors.email &&
        !errors.password &&
        !errors.name &&
        !errors.password2 &&
        submitted
      ) {
        validationSuccessHandler(); // this will register the user
      }
    }
  }, [errors]);

  useEffect(() => {
    if (operation === "login") {
      if (!errors.email && !errors.password && submitted) {
        validationSuccessHandler(); // this will try to log in the user
      }
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    formData,
    errors,
    submitted,
  };
};
