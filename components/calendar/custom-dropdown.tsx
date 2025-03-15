"use client";

import React from "react";
import { ClassNames, CustomComponents, DropdownOption } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DropDownType = {
  components: CustomComponents;
  classNames: ClassNames;
  options?: DropdownOption[] | undefined;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

export default function CustomDropdown({
  props,
  open,
  onOpenChange,
}: {
  props: DropDownType;
  // TODO: make bellow types required
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}): React.JSX.Element | undefined {
  const { options, value, onChange, dir } = props;
  const validDir = dir === "ltr" || dir === "rtl" ? dir : undefined;

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
          "hover:bg-accent"
        )}
      >
        <SelectValue />
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

export function useDropdowns(initial = { month: false, year: false }) {
  const [openDropdowns, setOpenDropdowns] = React.useState(initial);

  const setDropdownOpen = (dropdownType: "month" | "year", isOpen: boolean) => {
    setOpenDropdowns((prev) => ({ ...prev, [dropdownType]: isOpen }));
  };

  const isAnyDropdownOpen = Object.values(openDropdowns).some(Boolean);

  return { openDropdowns, setDropdownOpen, isAnyDropdownOpen };
}

export function DropdownWrapper({
  props,
  openDropdowns,
  setDropdownOpen,
}: {
  props: DropDownType;
  openDropdowns: { [key: string]: boolean };
  setDropdownOpen: (dropdownType: "month" | "year", isOpen: boolean) => void;
}) {
  const dropdownType = props["aria-label"]?.includes("Month")
    ? "month"
    : "year";

  return (
    <CustomDropdown
      props={props}
      open={openDropdowns[dropdownType]}
      onOpenChange={(isOpen: boolean) => setDropdownOpen(dropdownType, isOpen)}
    />
  );
}
