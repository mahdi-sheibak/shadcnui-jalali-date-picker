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
    <div className="flex flex-col justify-center items-center gap-2 text-center">
      <h2 className="text-lg font-medium">Shadcnui Jalali Date Picker</h2>
      <div className={cn('flex justify-center w-[223px] rounded-lg border', 'rtl:flex-row-reverse')}>
        {pagesInfo.map(page => (
          <Link
            href={page.link}
            key={page.link}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'border-none w-full',
              pathname === page.link && 'bg-primary text-white hover:bg-primary hover:text-white rounded-e-none',
            )}
          >
            {pathname === '/gregorian' ? page.gregorianTitle : page.jalaliTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}
