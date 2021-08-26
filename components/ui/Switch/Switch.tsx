import { Switch } from '@headlessui/react';

interface Props {
  enabled: boolean;
  onChange: any;
  children: any;
}

export function FuiSwitch({ enabled, onChange, children }: Props) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${
        enabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-600'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className='sr-only'>{children}</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
}
