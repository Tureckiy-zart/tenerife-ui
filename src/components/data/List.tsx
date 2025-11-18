import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

interface ListItem {
  id: string;
  title: string;
  description?: string;
}

interface ListProps {
  items: ListItem[];
  className?: string;
}

export const List: React.FC<ListProps> = ({
  items,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Heading level={3} className="font-medium">{item.title}</Heading>
          {item.description && (
            <Text size="sm" color="muted" className="mt-1">
              {item.description}
            </Text>
          )}
        </div>
      ))}
    </div>
  );
};
