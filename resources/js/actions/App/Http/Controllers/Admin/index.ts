import DashboardController from './DashboardController'
import UsersController from './UsersController'
import ProductsController from './ProductsController'
import TransactionsController from './TransactionsController'
import WithdrawalsController from './WithdrawalsController'
import WalletController from './WalletController'
import AnnouncementController from './AnnouncementController'

const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    UsersController: Object.assign(UsersController, UsersController),
    ProductsController: Object.assign(ProductsController, ProductsController),
    TransactionsController: Object.assign(TransactionsController, TransactionsController),
    WithdrawalsController: Object.assign(WithdrawalsController, WithdrawalsController),
    WalletController: Object.assign(WalletController, WalletController),
    AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
}

export default Admin