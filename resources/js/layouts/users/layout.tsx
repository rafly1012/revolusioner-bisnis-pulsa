import type { PropsWithChildren } from 'react';

export default function UsersLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex justify-center px-4 py-6">
            <div className="w-full max-w-2xl">
                <section className="space-y-12">{children}</section>
            </div>
        </div>
    );
}
