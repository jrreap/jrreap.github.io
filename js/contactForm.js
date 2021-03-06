let errors = []

emailjs.init('user_6UUFIT7IfsgLpO2vfgnsr')

async function sendEmail (formElement) {
  await emailjs.sendForm('service_zwvrkml', 'template_fb3kkpb', formElement)
}

async function handleFormSubmit (event) {
  event.preventDefault()
  errors = []

  const formElement = document.querySelector('form')
  const formData = new FormData(formElement)

  for (const item of formData.entries()) {
    await validateInputs(item[0], item[1])
  }

  if (errors.length === 0) {
    await sendEmail(formElement)
  }

  updateAlert()
}

function updateAlert () {
  const alertEle = document.getElementById('alert')
  const alertSuccess = document.getElementById('alert-success')

  if (errors.length === 0) {
    alertEle.classList.add('visually-hidden')
    alertSuccess.classList.remove('visually-hidden')
    return
  }

  const listEle = document.getElementById('alert-message')

  // Clear any previous errors
  listEle.innerHTML = ''

  for (const error of errors) {
    const list = document.createElement('li')
    list.innerText = error
    listEle.insertAdjacentElement('beforeend', list)
  }
  alertEle.classList.remove('visually-hidden')
  alertSuccess.classList.add('visually-hidden')
}

async function validateInputs (key, value) {
  switch (key) {
    case 'user_fname':
      if (isStringNullOrEmpty(value)) {
        errors.push('First name must not be empty!')
      }
      break
    case 'user_lname':
      if (isStringNullOrEmpty(value)) {
        errors.push('Last name must not be empty!')
      }
      break
    case 'user_email':
      const valid = await validateEmail(value)
      if (!valid) {
        errors.push('You must submit a valid email!')
      }
      break
    case 'user_message':
      if (isStringNullOrEmpty(value)) {
        errors.push('Your message can not be blank!')
      }
      break
  }
}

function validatePhone (phone) {
  const parsed = phone.split('-')
  if (parsed.length === 3) {
    // Check lengths
    if (parsed[0].length === 3 && parsed[1].length === 3 && parsed[2].length === 4) {
      // Check they are actual numbers
      for (const num of parsed) {
        if (isNaN(num)) {
          return false
        }
      }

      return true
    }
  }

  return false
}

async function validateEmail (email) {
  const domains = await getDomains()

  const half = email.split('@')

  if (half.length === 2) {
    const fqdn = half[1].split('.')
    if (fqdn.length === 2) {
      const topLevelDomain = fqdn[1]

      for (const item of domains) {
        if (topLevelDomain === item.toLowerCase()) {
          return true
        }
      }

      return true
    }
  }
  return false
}

async function getDomains () {
  try {
    const res = await fetch('http://data.iana.org/TLD/tlds-alpha-by-domain.txt')

    if (!res.ok) {
      throw new Error('Response returned with a non success status code!')
    }

    const raw = await res.text()
    const parsed = raw.split('\n')
    parsed.splice(0, 1) // Removed the comment at the top
    return parsed
  } catch (err) {
    console.error(err)
    return []
  }
}

function isStringNullOrEmpty (text) {
  if (text === '') {
    return true
  }

  if (text === null || text === undefined) {
    return true
  }

  return false
}

// Bind a click event to the button
document.getElementById('submit').onclick = (event) => { handleFormSubmit(event) }
