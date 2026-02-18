import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/wallets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::index
* @see app/Http/Controllers/Users/WalletsController.php:16
* @route '/user/wallets'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/user/wallets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::create
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Users\WalletsController::store
* @see app/Http/Controllers/Users/WalletsController.php:50
* @route '/user/wallets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/wallets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::store
* @see app/Http/Controllers/Users/WalletsController.php:50
* @route '/user/wallets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::store
* @see app/Http/Controllers/Users/WalletsController.php:50
* @route '/user/wallets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::store
* @see app/Http/Controllers/Users/WalletsController.php:50
* @route '/user/wallets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::store
* @see app/Http/Controllers/Users/WalletsController.php:50
* @route '/user/wallets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
export const show = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/wallets/{wallet}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
show.url = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { wallet: args }
    }

    if (Array.isArray(args)) {
        args = {
            wallet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        wallet: args.wallet,
    }

    return show.definition.url
            .replace('{wallet}', parsedArgs.wallet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
show.get = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
show.head = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
const showForm = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
showForm.get = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::show
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
showForm.head = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
export const edit = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/user/wallets/{wallet}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
edit.url = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { wallet: args }
    }

    if (Array.isArray(args)) {
        args = {
            wallet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        wallet: args.wallet,
    }

    return edit.definition.url
            .replace('{wallet}', parsedArgs.wallet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
edit.get = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
edit.head = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
const editForm = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
editForm.get = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::edit
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}/edit'
*/
editForm.head = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
export const update = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/user/wallets/{wallet}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
update.url = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { wallet: args }
    }

    if (Array.isArray(args)) {
        args = {
            wallet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        wallet: args.wallet,
    }

    return update.definition.url
            .replace('{wallet}', parsedArgs.wallet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
update.put = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
update.patch = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
const updateForm = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
updateForm.put = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::update
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
updateForm.patch = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Users\WalletsController::destroy
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
export const destroy = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/wallets/{wallet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Users\WalletsController::destroy
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
destroy.url = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { wallet: args }
    }

    if (Array.isArray(args)) {
        args = {
            wallet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        wallet: args.wallet,
    }

    return destroy.definition.url
            .replace('{wallet}', parsedArgs.wallet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WalletsController::destroy
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
destroy.delete = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::destroy
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
const destroyForm = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WalletsController::destroy
* @see app/Http/Controllers/Users/WalletsController.php:0
* @route '/user/wallets/{wallet}'
*/
destroyForm.delete = (args: { wallet: string | number } | [wallet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const wallets = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default wallets