import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Shadcnui Jalali Date Picker',
  description: 'Shadcnui Jalali Date Picker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
