'use client';
import { Tab } from '@headlessui/react'
import clsx from 'clsx';
import { ReactNode } from 'react'

type TabsProps = {
    tabs?: {
        tab: string;
        panel: ReactNode;
    }[]
}

export default function Tabs({ tabs }: TabsProps) {

    return (
        <div className="w-full max-w-md">
            <Tab.Group>
                <Tab.List className="flex gap-2 mb-4">
                    {
                        tabs?.map(tab => (
                            <Tab
                                key={tab.tab}
                                className={({ selected }) =>
                                    clsx(
                                        'rounded-md px-4 py-2 text-sm bg-primary-100 font-semibold shadow-md',
                                        selected
                                            ? 'bg-primary-800 border-transparent text-white'
                                            : 'text-sky-500'
                                    )
                                }
                            >
                                {tab.tab}
                            </Tab>
                        ))
                    }
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {
                        tabs?.map(tab => (
                            <Tab.Panel
                                key={tab.tab}
                                className={clsx(
                                    'rounded-xl bg-white',
                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                {
                                    tab.panel
                                }
                            </Tab.Panel>
                        ))
                    }
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
