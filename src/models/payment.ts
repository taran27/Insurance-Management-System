import Employee from 'models/employee'
import Client from 'models/client'
interface Payment {
  amount_paid?: number
  client?: Client
  branch_manager?: string
  agency_manager?: string
  supervisor?: string
  sales_agent?: string
}

export default Payment
