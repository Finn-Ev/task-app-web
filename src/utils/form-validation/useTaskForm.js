import { useState, useEffect } from 'react';
import moment from 'moment';

const initialValues = {
  taskName: '',
  notes: '',
  dueDate: ''
};

export const useTaskForm = (
  validationSuccessHandler,
  validateForm,
  taskData = initialValues
) => {
  const [formData, setFormData] = useState({
    ...taskData,
    dueDate: taskData.dueDate
      ? moment(taskData.dueDate).format('DD.MM.YYYY')
      : ''
  });
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validateForm(formData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!errors.taskName && !errors.notes && !errors.dueDate && isSubmitting) {
      validationSuccessHandler();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    formData,
    errors
  };
};
