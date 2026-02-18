import referrals from './referrals'
import users from './users'
import products from './products'
import transactions from './transactions'
import withdrawals from './withdrawals'
import wallets from './wallets'

const user = {
    referrals: Object.assign(referrals, referrals),
    users: Object.assign(users, users),
    products: Object.assign(products, products),
    transactions: Object.assign(transactions, transactions),
    withdrawals: Object.assign(withdrawals, withdrawals),
    wallets: Object.assign(wallets, wallets),
}

export default user