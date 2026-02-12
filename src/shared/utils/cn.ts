import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'heading-b',
        'heading-s',
        'heading-m',
        'heading-r',
        'title-b',
        'title-s',
        'title-m',
        'title-r',
        'subtitle-b',
        'subtitle-s',
        'subtitle-m',
        'subtitle-r',
        'body-b',
        'body-s',
        'body-m',
        'body-r',
        'label-b',
        'label-s',
        'label-m',
        'label-r',
        'caption-b',
        'caption-s',
        'caption-m',
        'caption-r',
        'timer',
        'heading-dashboard',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
