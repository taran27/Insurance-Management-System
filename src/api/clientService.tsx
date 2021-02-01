import Client from 'models/client'
import Plan from 'models/plan'

const clients: Client[] = [
  {
    id: 1,
    code: 'HEY-7634464',
    firstname: 'Fidfdfdfdfdfdfdfr',
    middlename: 'Miesds',
    lastname: 'Lasedfdf',
    payment_count: 4,
    balance: 0,
    plan: 'Plan 1',
    payment_period: 'Quarterly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    branch: 'Somewhere',
    payment_mode: 'Fullpayment',
    years_to_pay: 5,
    birthdate: new Date('10/03/1991'),
    end_date: new Date('09/06/2025'),
  },
  {
    id: 2,
    code: 'HEY-7634554',
    firstname: 'Fidfdfdfdfdfdfdfr',
    middlename: 'Mie',
    lastname: 'Lase',
    payment_count: 4,
    balance: 20000,
    plan: 'Plan 1',
    payment_period: 'Monthly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    branch: 'Somewhere',
    years_to_pay: 5,
    payment_mode: 'Installment',
    birthdate: new Date('10/03/1991'),
    end_date: new Date('09/06/2025'),
  },
  {
    id: 3,
    code: 'HEY-7654554',
    firstname: 'Fidfdfdfdfdfdfdfr',
    middlename: 'Mie',
    lastname: 'Lase',
    payment_count: 4,
    balance: 0,
    plan: 'Plan 3',
    payment_period: 'Monthly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    branch: 'Somewhere',
    years_to_pay: 5,
    payment_mode: 'Installment',
    birthdate: new Date('10/03/1991'),
    end_date: new Date('09/06/2025'),
  },
]

const plans: Plan[] = [
  {
    price: 23280,
    plan: 'Plan 1',
    monthly: 388,
    quarterly: 1164,
    semiAnnually: 2328,
    annually: 4656,
  },
  {
    price: 32280,
    plan: 'Plan 2',
    monthly: 538,
    quarterly: 1614,
    semiAnnually: 3228,
    annually: 6456,
  },
  {
    price: 41280,
    plan: 'Plan 3',
    monthly: 688,
    quarterly: 2064,
    semiAnnually: 4128,
    annually: 8256,
  },
]

export const getClient = async (clients: Client[], id: number) => {
  const client = clients.filter((client) => client.id === id)[0]
  return Promise.resolve(client)
}

export const getPlans = async () => {
  return new Promise<Plan[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(plans)
    }, 1000)
  })
}

export const getClients = async () => {
  return new Promise<Client[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(clients)
    }, 1000)
  })
}

export const getAmountToPay = (client: Client, plans: Plan[]) => {
  const plan = plans.filter((plan) => plan.plan === client.plan)[0]

  if (client.payment_mode === 'Fullpayment') {
    return plan.price
  }

  let amount = 0

  switch (client.payment_period) {
    case 'Monthly':
      amount = plan.monthly
      break
    case 'Quarterly':
      amount = plan.quarterly
      break
    case 'Semi-Annually':
      amount = plan.semiAnnually
      break
    case 'Annually':
      amount = plan.annually
      break
    default:
      amount = 0
      break
  }

  return amount
}

export const computeTotalCountToPay = (client: Client) => {
  let period: number = 0

  switch (client.payment_period) {
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
    default:
      period = 0
      break
  }

  return period * client.years_to_pay!
}

export const computeTotalCountPaid = (client: Client, plans: Plan[]) => {
  if (!plans.length) return '?'
  const amount = getAmountToPay(client, plans)
  const totalCountPaid = computeTotalCountToPay(client)
  return (
    totalCountPaid - Math.ceil(client.balance! / amount) + '/' + totalCountPaid
  )
}