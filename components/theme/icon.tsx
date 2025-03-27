import { FlameIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Icon = ({ className }: { className?: string }) => (
  <FlameIcon className={cn(className)} />
);