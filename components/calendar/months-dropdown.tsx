import type { DropdownProps } from 'react-day-picker';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

function MonthsDropdown({ value, options, className, onChange, ...props }: DropdownProps) {
  return (
    <Select
      value={value?.toString()}
      onValueChange={newValue => {
        if (!onChange) return;

        const event = {
          target: {
            value: newValue,
          },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }}
    >
      <SelectTrigger
        aria-label={props['aria-label']}
        className={cn('h-7 w-24 px-2 py-1 font-medium', 'transition-colors', 'hover:bg-accent', className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options?.map(option => (
          <SelectItem disabled={option.disabled} key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { MonthsDropdown };
