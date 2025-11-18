"use client";

import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { Card, CardContent } from '@/components/primitives/Card';
import { cn } from '@/lib/utils';

interface TrendingSectionProps {
  events?: any[];
  limit?: number;
  loading?: boolean;
  className?: string;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ 
  events = [], 
  limit = 5, 
  loading = false, 
  className 
}) => {
  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-6">
        <Heading level={2} className="mb-4">Trending Events</Heading>
        {loading ? (
          <Text color="muted">Loading trending events...</Text>
        ) : (
          <Text color="muted">
            Showing {events.length} trending events (limit: {limit})
          </Text>
        )}
      </CardContent>
    </Card>
  );
};
