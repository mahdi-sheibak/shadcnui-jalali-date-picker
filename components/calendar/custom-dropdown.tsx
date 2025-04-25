"use client";

import React from "react";
import { DropdownProps } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DropdownVariantClasses = {
  month_dropdown_class?: string;
  year_dropdown_class?: string;
};

export default function CustomDropdown({
  props,
  open,
  onOpenChange,
  dropdownClasses,
}: {
  props: DropdownProps;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  dropdownClasses?: DropdownVariantClasses;
}): React.JSX.Element | undefined {
  const { options, value, onChange, dir, classNames } = props;
  const validDir = dir === "ltr" || dir === "rtl" ? dir : undefined;
  const dropdownType = props["aria-label"]?.includes("Month")
    ? "month"
    : "year";

  const handleCalendarChange = (newValue: string) => {
    if (onChange) {
      const event = {
        target: {
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  return (
    <Select
      {...props}
      value={value?.toString()}
      open={open}
      onOpenChange={onOpenChange}
      defaultValue={value?.toString()}
      onValueChange={handleCalendarChange}
      dir={validDir}
    >
      <SelectTrigger
        className={cn(
          "px-2 py-1 h-7 w-24 font-medium hover:bg-accent",
          "transition-colors",
          "hover:bg-accent",
          classNames.dropdown_root,
          dropdownType === "month"
            ? dropdownClasses?.month_dropdown_class
            : dropdownClasses?.year_dropdown_class
        )}
        aria-label={props["aria-label"]}
      >
        <SelectValue className={classNames.caption_label} />
      </SelectTrigger>
      <SelectContent>
        {options?.map(({ value, label, disabled }) => (
          <SelectItem
            key={value}
            value={value.toString()}
            disabled={disabled}
            className="min-w-[var(--radix-popper-anchor-width)] pr-7"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function useDropdowns(initial: Record<string, boolean> = {}) {
  const [openDropdowns, setOpenDropdowns] = React.useState(initial);

  const setDropdownOpen = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdowns((prev) => ({ ...prev, [dropdownId]: isOpen }));
  };

  const isAnyDropdownOpen = Object.values(openDropdowns).some(Boolean);

  return { openDropdowns, setDropdownOpen, isAnyDropdownOpen };
}

export function DropdownWrapper({
  props,
  id = "default",
  openDropdowns,
  setDropdownOpen,
  dropdownClasses,
}: {
  props: DropdownProps;
  id: string;
  openDropdowns: Record<string, boolean>;
  setDropdownOpen: (dropdownId: string, isOpen: boolean) => void;
  dropdownClasses?: DropdownVariantClasses;
}) {
  const dropdownType = props["aria-label"]?.includes("Month")
    ? "month"
    : "year";
  const dropdownKey = `${id}-${dropdownType}`;

  return (
    <CustomDropdown
      props={props}
      open={openDropdowns[dropdownKey]}
      onOpenChange={(isOpen: boolean) => setDropdownOpen(dropdownKey, isOpen)}
      dropdownClasses={dropdownClasses}
    />
  );
}
