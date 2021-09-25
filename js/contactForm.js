let errors = []

async function handleFormSubmit (event) {
  event.preventDefault()
  errors = [ "Name is empty", "AHHH Ev is weird" ]

  const formElement = document.querySelector('form');
  const formData = new FormData(formElement)

  for (const item of formData.entries()) {
    console.log(`${item[0]}, ${item[1]}`)
    await validateInputs(item[0], item[1])
  }

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

async function validateInputs (key, value) {
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
      if (await !validateEmail(value)) {
        errors.push("You must submit a valid email!")
      }
      break
    case "user_phone":
      break
    case "user_message":
      break
  }
}

async function validateEmail (email) {
  //const domains = await getDomains()

  const half = email.split('@')
  const fqdn = half[1].split('.')
  const address = half[0]
  const domain = fqdn[0]
  const topLevelDomain = fqdn[1]

  console.log(address)
  console.log(domain)
  console.log(topLevelDomain)

}

async function getDomains () {
  try {
    const res = await fetch({
      url: "http://data.iana.org/TLD/tlds-alpha-by-domain.txt",
    })
    const json = await res.json()
    console.log(json)
    return json
  } catch (err) {
    console.error(err)
  }
}

function parseRawEmail (email) {

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

// Bind a click event to the button
document.getElementById('submit').onclick = (event) => handleFormSubmit(event)
