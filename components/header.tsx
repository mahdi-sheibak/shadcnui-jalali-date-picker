'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { buttonVariants } from './ui/button';

const pagesInfo = [
  {
    link: '/gregorian',
    jalaliTitle: 'میلادی',
    gregorianTitle: 'Gregorian',
  },
  {
    link: '/',
    jalaliTitle: 'شمسی',
    gregorianTitle: 'Jalali',
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-lg font-medium">Shadcnui Jalali Date Picker</h2>
      <div className={cn('flex w-[223px] justify-center rounded-lg border', 'rtl:flex-row-reverse')}>
        {pagesInfo.map(page => (
          <Link
            href={page.link}
            key={page.link}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full border-none',
              pathname === page.link &&
                `
                  bg-primary rounded-e-none text-white
                  hover:bg-primary hover:text-white
                `,
            )}
          >
            {pathname === '/gregorian' ? page.gregorianTitle : page.jalaliTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}
