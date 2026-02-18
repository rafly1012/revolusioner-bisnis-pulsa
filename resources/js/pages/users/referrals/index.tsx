import { Head, router, usePage } from '@inertiajs/react';
import {
    Check,
    Coins,
    Copy,
    Link,
    Loader2,
    Medal,
    Award,
    Trophy,
    Gem,
    Diamond,
    Star,
} from 'lucide-react';
import { useState } from 'react';
import ReferralController from '@/actions/App/Http/Controllers/Users/ReferralController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { useClipboard } from '@/hooks/use-clipboard';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { BreadcrumbItem, SharedData } from '@/types';

type PageProps = {
    data: {
        stats: {
            by_level: Record<number, number>;
            total: number;
        };
        rank: string;
        claimed_ranks: string[];
        wallet_balance: number;
    };
    wallet_balance?: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referrals',
        href: ReferralController.index().url,
    },
];

const RANK_BONUSES: Record<string, number> = {
    Bronze: 100000,
    Silver: 500000,
    Gold: 1000000,
    Platinum: 1000000,
    Diamond: 1000000,
    'Star 1': 2000000,
    'Star 2': 3000000,
    'Star 3': 5000000,
    'Star 4': 10000000,
    'Star 5': 25000000,
};

const RANK_ORDER = [
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Star 1',
    'Star 2',
    'Star 3',
    'Star 4',
    'Star 5',
];

const RANK_ICONS: Record<string, React.ElementType> = {
    Bronze: Medal,
    Silver: Award,
    Gold: Trophy,
    Platinum: Gem,
    Diamond: Diamond,
    'Star 1': Star,
    'Star 2': Star,
    'Star 3': Star,
    'Star 4': Star,
    'Star 5': Star,
};

export default function Index() {
    const { auth } = usePage<SharedData>().props;
    const { data } = usePage<PageProps>().props;
    const { stats, rank, claimed_ranks } = data;
    const [copiedText, copy] = useClipboard();
    const [isClaiming, setIsClaiming] = useState(false);

    const IconComponent = copiedText === auth.user.referral_code ? Check : Copy;
    const referralLink = `${window.location.origin}/register?ref=${auth.user.referral_code}`;
    const IconComponentLink = copiedText === referralLink ? Check : Link;

    const getClaimableBonus = () => {
        for (const rankName of [...RANK_ORDER].reverse()) {
            if (!claimed_ranks.includes(rankName)) {
                const currentIndex = RANK_ORDER.indexOf(rank);
                const targetIndex = RANK_ORDER.indexOf(rankName);

                if (currentIndex >= targetIndex) {
                    return { rank: rankName, amount: RANK_BONUSES[rankName] };
                }
            }
        }
        return null;
    };

    const claimableBonus = getClaimableBonus();

    const handleClaim = () => {
        setIsClaiming(true);
        router.post(ReferralController.claim(auth.user.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Referrals" />

            <UsersLayout>
                <div className="space-y-6">
                    <Heading variant="small" title="Referrals" />

                    <Item variant="outline">
                        <ItemContent>
                            <ItemTitle className="font-mono">
                                {auth.user.referral_code}
                            </ItemTitle>
                        </ItemContent>
                        <ItemActions>
                            <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() => copy(auth.user.referral_code)}
                            >
                                <IconComponent />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={() => copy(referralLink)}
                            >
                                <IconComponentLink />
                            </Button>
                        </ItemActions>
                    </Item>

                    {/* Referral Levels */}
                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Statistik Level Referral</CardTitle>
                            <CardDescription>
                                Distribusi downline per level
                            </CardDescription>
                            <CardAction>
                                <Button variant="outline" size="sm">
                                    {(() => {
                                        const Icon = RANK_ICONS[rank];
                                        return Icon ? <Icon /> : null;
                                    })()}
                                    {rank}
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <ItemGroup className="grid grid-cols-2 gap-2 md:grid-cols-5">
                                {Object.entries(stats.by_level).map(
                                    ([level, count]) => (
                                        <Item
                                            key={level}
                                            size="xs"
                                            variant="outline"
                                        >
                                            <ItemContent>
                                                <ItemDescription>
                                                    Level {level}
                                                </ItemDescription>
                                            </ItemContent>
                                            <ItemContent>
                                                <ItemTitle>{count}</ItemTitle>
                                            </ItemContent>
                                        </Item>
                                    ),
                                )}
                            </ItemGroup>
                        </CardContent>
                    </Card>

                    {claimableBonus && (
                        <Card size="sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Bonus Peringkat
                                </CardTitle>
                                <CardDescription>
                                    Klaim bonus sekali saja untuk setiap
                                    peringkat yang dicapai
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Item variant="muted" size="xs">
                                    <ItemContent>
                                        <ItemTitle>
                                            {formatCurrency(
                                                claimableBonus.amount,
                                            )}
                                        </ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            onClick={handleClaim}
                                            disabled={isClaiming}
                                            size="sm"
                                        >
                                            {isClaiming ? (
                                                <>
                                                    <Loader2 className="animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    <Coins />
                                                    Klaim Sekarang
                                                </>
                                            )}
                                        </Button>
                                    </ItemActions>
                                </Item>
                            </CardContent>
                        </Card>
                    )}

                    <Card size="sm">
                        <CardHeader>
                            <CardTitle>Informasi Bonus Rank</CardTitle>
                            <CardDescription>
                                Jumlah user yang dibutuhkan dan bonus untuk tiap
                                peringkat
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <ItemGroup className="grid gap-2">
                                {RANK_ORDER.map((rankName) => {
                                    const bonus = RANK_BONUSES[rankName];

                                    let requiredUsers = 0;
                                    let isSingleLevel = false;

                                    switch (rankName) {
                                        case 'Bronze':
                                            requiredUsers = 10;
                                            isSingleLevel = true;
                                            break;
                                        case 'Silver':
                                            requiredUsers = 50;
                                            isSingleLevel = true;
                                            break;
                                        case 'Gold':
                                            requiredUsers = 100;
                                            isSingleLevel = true; // jika sesuai daftar Anda
                                            break;
                                        case 'Platinum':
                                            requiredUsers = 1000;
                                            isSingleLevel = false;
                                            break;
                                        case 'Diamond':
                                            requiredUsers = 5000;
                                            isSingleLevel = false;
                                            break;
                                        case 'Star 1':
                                            requiredUsers = 10000;
                                            isSingleLevel = false;
                                            break;
                                        case 'Star 2':
                                            requiredUsers = 20000;
                                            isSingleLevel = false;
                                            break;
                                        case 'Star 3':
                                            requiredUsers = 40000;
                                            isSingleLevel = false;
                                            break;
                                        case 'Star 4':
                                            requiredUsers = 80000;
                                            isSingleLevel = false;
                                            break;
                                        case 'Star 5':
                                            requiredUsers = 100000;
                                            isSingleLevel = false;
                                            break;
                                    }

                                    const Icon = RANK_ICONS[rankName];

                                    return (
                                        <Item
                                            key={rankName}
                                            variant="outline"
                                            size="xs"
                                        >
                                            <ItemMedia variant="icon">
                                                <Icon className="h-4 w-4 text-primary" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemTitle>
                                                    {rankName}
                                                </ItemTitle>

                                                <ItemDescription>
                                                    Minimal{' '}
                                                    <b className="text-primary">
                                                        {formatNumber(
                                                            requiredUsers,
                                                        )}{' '}
                                                        user referral
                                                    </b>{' '}
                                                    (
                                                    {isSingleLevel ? (
                                                        <span className="font-medium text-foreground">
                                                            Level 1 saja
                                                        </span>
                                                    ) : (
                                                        <span className="font-medium text-foreground">
                                                            Akumulasi semua
                                                            level
                                                        </span>
                                                    )}
                                                    )
                                                </ItemDescription>
                                            </ItemContent>

                                            <ItemActions className="flex flex-col items-end">
                                                <span className="font-semibold">
                                                    {formatCurrency(bonus)}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Bonus {rankName}
                                                </span>
                                            </ItemActions>
                                        </Item>
                                    );
                                })}
                            </ItemGroup>

                            {/* Catatan */}
                            <div className="mt-4 rounded-lg border bg-muted p-3 text-sm text-muted-foreground">
                                <p>
                                    • Peringkat{' '}
                                    <span className="font-semibold text-foreground">
                                        Bronze
                                    </span>{' '}
                                    sampai{' '}
                                    <span className="font-semibold text-foreground">
                                        Gold
                                    </span>{' '}
                                    dihitung dari{' '}
                                    <span className="font-semibold text-foreground">
                                        Level 1
                                    </span>
                                    .
                                </p>
                                <p>
                                    • Peringkat{' '}
                                    <span className="font-semibold text-foreground">
                                        Platinum
                                    </span>{' '}
                                    sampai{' '}
                                    <span className="font-semibold text-foreground">
                                        Star 5
                                    </span>{' '}
                                    dihitung dari{' '}
                                    <span className="font-semibold text-foreground">
                                        akumulasi semua level
                                    </span>
                                    .
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
