import type { NextMonthButtonProps } from 'react-day-picker';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

interface YearNavigationProps {
  monthContent: React.JSX.Element;
  monthClassName?: string;
  yearContent: React.JSX.Element;
  yearClassName?: string;
  yearDirection: 'next' | 'prev';
  isDisabled: boolean;
  onClick: () => void;
  props: NextMonthButtonProps;
}

export default function YearNavigation({
  monthContent,
  monthClassName,
  yearContent,
  yearClassName,
  yearDirection,
  isDisabled,
  onClick,
  props,
}: YearNavigationProps) {
  const isNextYear = yearDirection === 'next';

  return (
    <>
      <Button {...props} className={cn(monthClassName, props.className)} variant="outline">
        {monthContent}
      </Button>
      <Button
        size="icon"
        aria-label={isNextYear ? 'Go to the Next Year' : 'Go to the Previous Year'}
        className={cn(yearClassName, props.className)}
        disabled={isDisabled}
        variant="outline"
        onClick={onClick}
      >
        {yearContent}
      </Button>
    </>
  );
}
