import React, { useState } from 'react';

import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { FiCheck } from 'react-icons/fi';

// @ts-ignore
import DropdownStyles from './Dropdown.module.css';

import type * as RadixDropdownTypes from '@radix-ui/react-dropdown-menu/';

interface RootProps {
  open?: boolean;
  arrow?: boolean;
  onOpenChange?: RadixDropdownTypes.DropdownMenuOwnProps['onOpenChange'];
  side?: RadixDropdownTypes.DropdownMenuContentOwnProps['side'];
  align?: RadixDropdownTypes.DropdownMenuContentOwnProps['align'];
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isNested?: Boolean;
  triggerClasses?: any;
}

function Dropdown({
  open,
  onOpenChange,
  align = 'center', //Default value
  side = 'bottom', //Default value
  overlay,
  children,
  className,
  style,
  arrow,
  isNested,
  triggerClasses,
}: RootProps) {
  let classes = [DropdownStyles['fui-dropdown__content']];
  if (className) {
    classes.push(className);
  }

  return (
    <RadixDropdown.Root onOpenChange={onOpenChange} open={open}>
      {isNested ? (
        <RadixDropdown.TriggerItem
          className={
            DropdownStyles['fui-dropdown__trigger-item'] + ' ' + triggerClasses
          }
        >
          {children}
        </RadixDropdown.TriggerItem>
      ) : (
        <RadixDropdown.Trigger
          className={
            DropdownStyles['fui-dropdown__trigger'] + ' ' + triggerClasses
          }
        >
          {children}
        </RadixDropdown.Trigger>
      )}

      <RadixDropdown.Content
        sideOffset={8}
        side={side}
        align={align}
        className={classes.join(' ')}
        style={style}
      >
        {arrow && (
          <RadixDropdown.Arrow
            className={DropdownStyles['fui-dropdown__arrow']}
            offset={10}
          ></RadixDropdown.Arrow>
        )}
        {overlay}
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  );
}

interface ItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: Event) => void;
}

export function Item({ children, icon, disabled, onClick }: ItemProps) {
  return (
    <RadixDropdown.Item
      className={DropdownStyles['fui-dropdown-item']}
      disabled={disabled}
      onSelect={onClick}
    >
      {icon && icon}
      <span>{children}</span>
    </RadixDropdown.Item>
  );
}

export function TriggerItem({ children }: ItemProps) {
  return { children };
}

export function Misc({ children, icon }: ItemProps) {
  return (
    <div className={DropdownStyles['fui-dropdown-misc']}>
      {icon && icon}
      {children}
    </div>
  );
}

interface CheckboxProps {
  children: React.ReactNode;
  checked?: boolean;
  onChange?(x: boolean): void;
  disabled?: boolean;
  ItemIndicator?: React.ReactNode;
}

export function Checkbox({
  children,
  checked: propsChecked,
  onChange,
  disabled,
  ItemIndicator,
}: CheckboxProps) {
  const [checked, setChecked] = useState(propsChecked ? propsChecked : false);

  const handleChange = (e: boolean) => {
    if (onChange) onChange(e);
    setChecked(e);
  };

  return (
    <RadixDropdown.CheckboxItem
      checked={checked}
      onCheckedChange={handleChange}
      className={`${DropdownStyles['fui-dropdown-item']} ${DropdownStyles['fui-dropdown-input']}`}
      disabled={disabled}
    >
      <RadixDropdown.ItemIndicator
        className={DropdownStyles['fui-dropdown-input__check']}
      >
        {ItemIndicator ? ItemIndicator : <FiCheck />}
        <RadixDropdown.CheckboxItem />
      </RadixDropdown.ItemIndicator>
      <span>{children}</span>
    </RadixDropdown.CheckboxItem>
  );
}

interface RadioProps {
  children: React.ReactNode;
  value: string;
  ItemIndicator?: React.ReactNode;
}

export function Radio({ children, value, ItemIndicator }: RadioProps) {
  return (
    <RadixDropdown.RadioItem
      value={value}
      className={`${DropdownStyles['fui-dropdown-item']} ${DropdownStyles['fui-dropdown-input']}`}
    >
      <RadixDropdown.ItemIndicator
        className={DropdownStyles['fui-dropdown-input__check']}
      >
        {ItemIndicator ? ItemIndicator : <FiCheck />}
      </RadixDropdown.ItemIndicator>
      <span>{children}</span>
    </RadixDropdown.RadioItem>
  );
}

interface RadioGroupProps {
  children: React.ReactNode;
  value: string;
  onChange?(x: string): void;
}

export function RadioGroup({
  children,
  value: propsValue,
  onChange,
}: RadioGroupProps) {
  const [value, setValue] = useState(propsValue ? propsValue : '');

  const handleChange = (e: string) => {
    if (onChange) onChange(e);
    setValue(e);
  };

  return (
    <RadixDropdown.RadioGroup value={value} onValueChange={handleChange}>
      {children}
    </RadixDropdown.RadioGroup>
  );
}

interface LabelProps {
  children: React.ReactNode;
}

export function Label({ children }: LabelProps) {
  return (
    <RadixDropdown.Label className={DropdownStyles['fui-dropdown-label']}>
      {children}
    </RadixDropdown.Label>
  );
}

Dropdown.Item = Item;
Dropdown.Misc = Misc;
Dropdown.Checkbox = Checkbox;
Dropdown.Radio = Radio;
Dropdown.RadioGroup = RadioGroup;
Dropdown.Label = Label;
Dropdown.TriggerItem = TriggerItem;
export default Dropdown;
