import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Users\ReferralController::claim
* @see app/Http/Controllers/Users/ReferralController.php:32
* @route '/user/referrals/{referral}/claim'
*/
export const claim = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: claim.url(args, options),
    method: 'post',
})

claim.definition = {
    methods: ["post"],
    url: '/user/referrals/{referral}/claim',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Users\ReferralController::claim
* @see app/Http/Controllers/Users/ReferralController.php:32
* @route '/user/referrals/{referral}/claim'
*/
claim.url = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

    if (Array.isArray(args)) {
        args = {
            referral: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        referral: args.referral,
    }

    return claim.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Users\ReferralController::claim
* @see app/Http/Controllers/Users/ReferralController.php:32
* @route '/user/referrals/{referral}/claim'
*/
claim.post = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: claim.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\ReferralController::claim
* @see app/Http/Controllers/Users/ReferralController.php:32
* @route '/user/referrals/{referral}/claim'
*/
const claimForm = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: claim.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Users\ReferralController::claim
* @see app/Http/Controllers/Users/ReferralController.php:32
* @route '/user/referrals/{referral}/claim'
*/
claimForm.post = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: claim.url(args, options),
    method: 'post',
})

claim.form = claimForm

const referrals = {
    claim: Object.assign(claim, claim),
}

export default referrals