let errors = []

function handleFormSubmit () {
  errors = []

  const formElement = document.querySelector('form');
  const formData = new FormData(formElement)
  
  formData.forEach((value, key) => {
    console.log(`${value}, ${key}`)
    validateInputs(key, value)
  })
}

function validateInputs (key, value) {
  switch (key) {
    case "user_fname":
      if (isStringNullOrEmpty(value)) {
        errors.push("First name must not be empty!")
      }
      break
    case "user_lname":
      if (isStringNullOrEmpty(value)) {
        errors.push("Last name must not be empty!")
      }
      break
    case "user_email":
      break
    case "user_phone":
      break
    case "user_message":
      break
  }
}

function validateEmail () {
  
}

function isStringNullOrEmpty (text) {
  if (text === "") {
    return true
  }

  if (text === null || text === undefined) {
    return true
  }

  return false
}

document.getElementById('submit').onclick = handleFormSubmit
