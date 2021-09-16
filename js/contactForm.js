let errors = []

function handleFormSubmit () {
  errors = [ "Name is empty", "AHHH Ev is weird" ]

  const formElement = document.querySelector('form');
  const formData = new FormData(formElement)
  
  formData.forEach((value, key) => {
    console.log(`${value}, ${key}`)
    validateInputs(key, value)
  })

  updateAlert()
}

function updateAlert () {
  if (errors.length === 0) {
    return
  }

  const alertEle = document.getElementById('alert')
  const listEle = document.getElementById('alert-message')

  for (const error of errors) {
    const list = document.createElement('li')
    list.innerText = error
    listEle.insertAdjacentElement('afterend', list)
  }
  alertEle.classList.remove('visually-hidden')
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
