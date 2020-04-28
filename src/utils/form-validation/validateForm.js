export const validateForm = (data) => {
  let errors = {};

  // username
  if (!data.name) {
    errors.name = "Ein Benutzername ist erforderlich";
  } else if (data.name.length < 2) {
    errors.name = "Der Benutzername muss mindestens zwei Zeichen enthalten";
  }

  //email
  if (!data.email) {
    errors.email = "Eine Email Adresse ist erforderlich";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Die Email Adresse muss gültig sein";
  }

  // passwort 1
  if (!data.password) {
    errors.password = "Ein Passwort  ist erforderlich";
  } else if (data.password.length < 6) {
    errors.password = "Das Passwort muss min. sechs Zeichen enthalten";
  }
  // passwort 2
  if (data.password !== data.password2) {
    errors.password2 = "Die Passwörter stimmen nicht überein";
  }

  //Aufgabentitel
  if (!data.taskName) {
    errors.taskName = "Ein Aufgabentitel ist erforderlich";
  }
  if (!data.dueDate) {
    errors.dueDate = "Sie müssen ein Fälligkeitsdatum angeben";
  } else if (
    !/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g.test(
      data.dueDate
    )
  ) {
    errors.dueDate = "Sie müssen ein gültiges Fälligkeitsdatum angeben";
  }

  return errors;
};
