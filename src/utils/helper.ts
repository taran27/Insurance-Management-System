import Joi from 'joi'
import jwtDecode from 'jwt-decode'

export const lettersOnly = (label: string) => {
  return Joi.string()
    .required()
    .label(label)
    .regex(/^[A-Za-z\s]*$/)
    .error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case 'string.empty':
            err.message = `"${label}" is required`
            break
          case 'string.pattern.base':
            err.message = `"${label}" must not have a number or special character`
            break
          default:
            break
        }
      })
      return errors
    })
}

export const alphaNumeric = (label: string) => {
  return Joi.string()
    .required()
    .label(label)
    .alphanum()
    .error((errors: any) => {
      errors.forEach((err: any) => {
        if (err.code === 'string.empty') {
          err.message = `"${label}" is required`
        }
      })
      return errors
    })
}

export const notNull = (label: string) => {
  return Joi.required()
    .not(null)
    .not('')
    .messages({
      'any.invalid': `"${label}" is required`,
      'any.required': `"${label}" is required`,
    })
}

export const nameCapitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1) || ''

export const getDecodeToken: any = () => {
  const token = localStorage.getItem('access-token')

  try {
    if (token) {
      return jwtDecode(token)
    }
  } catch (error) {
    return null
  }
}

export const calculateAge = (date: any) => {
  if (!date) return 0
  const birthdate = new Date(new Date(date).toLocaleDateString())

  const ageDif = Date.now() - birthdate.getTime()
  const ageDate = new Date(ageDif)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const getNumberWithOrdinal = (num: number) => {
  var s = ['th', 'st', 'nd', 'rd'],
    v = num % 100
  return num + (s[(v - 20) % 10] || s[v] || s[0])
}

export const getTotalCountPayment = (
  payment_period: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually' | null,
) => {
  let period: number = 0

  switch (payment_period) {
    case 'Monthly':
      period = 12
      break
    case 'Quarterly':
      period = 4
      break
    case 'Semi-Annually':
      period = 2
      break
    case 'Annually':
      period = 1
      break
    case null:
      period = 0
      break
    default:
      period = 0
      break
  }

  return period * 5
}