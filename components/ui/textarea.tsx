import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  withCounter?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, withCounter, maxLength, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState(value || '');

    React.useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && onChange) {
        const newValue = e.target.value.slice(0, maxLength);
        setInputValue(newValue);

        // Create a new event with the modified value
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue,
          },
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(newEvent);
      } else if (onChange) {
        setInputValue(e.target.value);
        onChange(e);
      }
    };

    const currentLength = typeof inputValue === 'string' ? inputValue.length : 0;
    const percentage = maxLength ? (currentLength / maxLength) * 100 : 0;

    if (withCounter && maxLength) {
      return (
        <div className="relative">
          <textarea
            className={cn(
              'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              withCounter && 'pr-16',
              className
            )}
            ref={ref}
            value={value}
            onChange={handleChange}
            maxLength={maxLength}
            {...props}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {currentLength}/{maxLength}
          </div>
          <div className="mt-1 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    }

    return (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };