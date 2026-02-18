import Users from './Users'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    Users: Object.assign(Users, Users),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers