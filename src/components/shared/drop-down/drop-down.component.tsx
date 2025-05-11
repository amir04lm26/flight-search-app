import { PropsWithChildren, HTMLProps, useRef } from "react";
import { useClickAway, useToggle } from "react-use";

type DropdownProps = Readonly<
  PropsWithChildren<{
    isOpen: boolean;
    toggleOpen: ReturnType<typeof useToggle>[1];
  }> &
    HTMLProps<HTMLDivElement>
>;

export function Dropdown({
  isOpen,
  toggleOpen,
  children,
  ...rest
}: DropdownProps) {
  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, () => toggleOpen());

  if (!isOpen) return null;

  return (
    <section
      ref={dropdownRef}
      className='absolute z-50 top-10 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 dark:border-gray-600'
      {...rest}>
      {children}
    </section>
  );
}
