import { iranSans, iranSansFaNum } from '@/app/fonts';
import { Header } from '@/components/header';

interface Props {
  children: React.ReactNode;
  lang: string;
  dir: string;
}
export function MainLayout({ children, lang, dir }: Props) {
  return (
    <html dir={dir} lang={lang}>
      <body
        className={`
          ${iranSansFaNum.className}
          ${iranSans.className}
          antialiased
        `}
      >
        <div
          className={`
            grid gap-y-8 px-3 py-4
            sm:px-8
            md:px-16
            lg:px-22
          `}
        >
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
