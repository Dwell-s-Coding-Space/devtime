import { ComponentProps } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

interface FieldProps extends ComponentProps<'input'> {
  label: string;
  message?: string
  messageType?: 'error' | 'informative' | 'success';
}

const MessageVariants = cva("caption-m", {
  variants: {
    variant: {
      'error': 'text-feedback-negative',
      'informative': 'text-feedback-informative',
      'success': 'text-feedback-positive'
    }
  }
})

const TextField = ({ label, message, messageType, id: inputId, className, ...rest }: FieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="label-m text-text-g600">{label}</label>
      <input id={inputId} className={cn("px-4 py-3 bg-background-gray-light rounded-[5px] placeholder:body-m placeholder:text-text-disabled-300 body-m text-text-g800", className)} {...rest} />
      {message ? <span className={cn(MessageVariants({ variant: messageType }))}>{message}</span> : <div className="h-4" />}
    </div>
  );
}

export default TextField;