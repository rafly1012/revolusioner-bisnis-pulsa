import type { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="flex-1 md:max-w-6xl">
                    <section className="max-w-xl space-y-12 md:max-w-4xl">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
