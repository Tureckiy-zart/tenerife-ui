"use client";

import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { Card, CardContent } from '@/components/primitives/Card';
import { cn } from '@/lib/utils';

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-6">
        <Heading level={2} className="mb-4">Dashboard</Heading>
        <Text color="muted">Admin dashboard content</Text>
      </CardContent>
    </Card>
  );
};
