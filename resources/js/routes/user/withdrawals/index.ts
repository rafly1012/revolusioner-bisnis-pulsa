import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/withdrawals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::index
* @see app/Http/Controllers/Users/WithdrawalController.php:21
* @route '/user/withdrawals'
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
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/user/withdrawals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::create
* @see app/Http/Controllers/Users/WithdrawalController.php:31
* @route '/user/withdrawals/create'
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
* @see \App\Http\Controllers\Users\WithdrawalController::store
* @see app/Http/Controllers/Users/WithdrawalController.php:41
* @route '/user/withdrawals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/withdrawals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::store
* @see app/Http/Controllers/Users/WithdrawalController.php:41
* @route '/user/withdrawals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::store
* @see app/Http/Controllers/Users/WithdrawalController.php:41
* @route '/user/withdrawals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::store
* @see app/Http/Controllers/Users/WithdrawalController.php:41
* @route '/user/withdrawals'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::store
* @see app/Http/Controllers/Users/WithdrawalController.php:41
* @route '/user/withdrawals'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
export const show = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
show.url = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { withdrawal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            withdrawal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        withdrawal: typeof args.withdrawal === 'object'
        ? args.withdrawal.id
        : args.withdrawal,
    }

    return show.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
show.get = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
show.head = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
const showForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
showForm.get = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::show
* @see app/Http/Controllers/Users/WithdrawalController.php:68
* @route '/user/withdrawals/{withdrawal}'
*/
showForm.head = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
export const edit = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/user/withdrawals/{withdrawal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
edit.url = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    if (Array.isArray(args)) {
        args = {
            withdrawal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        withdrawal: args.withdrawal,
    }

    return edit.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
edit.get = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
edit.head = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
const editForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
editForm.get = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::edit
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}/edit'
*/
editForm.head = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
export const update = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/user/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
update.url = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    if (Array.isArray(args)) {
        args = {
            withdrawal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        withdrawal: args.withdrawal,
    }

    return update.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
update.put = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
update.patch = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
const updateForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
updateForm.put = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::update
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
updateForm.patch = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Users\WithdrawalController::destroy
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
export const destroy = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Users\WithdrawalController::destroy
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
destroy.url = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { withdrawal: args }
    }

    if (Array.isArray(args)) {
        args = {
            withdrawal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        withdrawal: args.withdrawal,
    }

    return destroy.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\WithdrawalController::destroy
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
destroy.delete = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::destroy
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
const destroyForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\WithdrawalController::destroy
* @see app/Http/Controllers/Users/WithdrawalController.php:0
* @route '/user/withdrawals/{withdrawal}'
*/
destroyForm.delete = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const withdrawals = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default withdrawals