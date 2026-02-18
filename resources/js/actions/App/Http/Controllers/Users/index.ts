import ReferralController from './ReferralController'
import ProductsController from './ProductsController'
import TransactionsController from './TransactionsController'
import WithdrawalController from './WithdrawalController'
import WalletsController from './WalletsController'

const Users = {
    ReferralController: Object.assign(ReferralController, ReferralController),
    ProductsController: Object.assign(ProductsController, ProductsController),
    TransactionsController: Object.assign(TransactionsController, TransactionsController),
    WithdrawalController: Object.assign(WithdrawalController, WithdrawalController),
    WalletsController: Object.assign(WalletsController, WalletsController),
}

export default Users