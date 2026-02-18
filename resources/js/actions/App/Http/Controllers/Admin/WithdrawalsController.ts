import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/withdrawals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::index
* @see app/Http/Controllers/Admin/WithdrawalsController.php:22
* @route '/admin/withdrawals'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/withdrawals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::create
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/create'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::store
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/withdrawals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::store
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::store
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::store
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::store
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
*/
export const show = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
*/
show.get = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
*/
show.head = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
*/
const showForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
*/
showForm.get = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::show
* @see app/Http/Controllers/Admin/WithdrawalsController.php:32
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
*/
export const edit = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/withdrawals/{withdrawal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
*/
edit.get = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
*/
edit.head = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
*/
const editForm = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
*/
editForm.get = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::edit
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}/edit'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
*/
export const update = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
*/
update.put = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
*/
update.patch = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::update
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::destroy
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
*/
export const destroy = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/withdrawals/{withdrawal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::destroy
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::destroy
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
*/
destroy.delete = (args: { withdrawal: string | number } | [withdrawal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::destroy
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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
* @see \App\Http\Controllers\Admin\WithdrawalsController::destroy
* @see app/Http/Controllers/Admin/WithdrawalsController.php:0
* @route '/admin/withdrawals/{withdrawal}'
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

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::verify
* @see app/Http/Controllers/Admin/WithdrawalsController.php:39
* @route '/admin/withdrawals/{withdrawal}/verify'
*/
export const verify = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: verify.url(args, options),
    method: 'patch',
})

verify.definition = {
    methods: ["patch"],
    url: '/admin/withdrawals/{withdrawal}/verify',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::verify
* @see app/Http/Controllers/Admin/WithdrawalsController.php:39
* @route '/admin/withdrawals/{withdrawal}/verify'
*/
verify.url = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{withdrawal}', parsedArgs.withdrawal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::verify
* @see app/Http/Controllers/Admin/WithdrawalsController.php:39
* @route '/admin/withdrawals/{withdrawal}/verify'
*/
verify.patch = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: verify.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::verify
* @see app/Http/Controllers/Admin/WithdrawalsController.php:39
* @route '/admin/withdrawals/{withdrawal}/verify'
*/
const verifyForm = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\WithdrawalsController::verify
* @see app/Http/Controllers/Admin/WithdrawalsController.php:39
* @route '/admin/withdrawals/{withdrawal}/verify'
*/
verifyForm.patch = (args: { withdrawal: number | { id: number } } | [withdrawal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

verify.form = verifyForm

const WithdrawalsController = { index, create, store, show, edit, update, destroy, verify }

export default WithdrawalsController