"use client";

import React from 'react';
import { Heading, Text } from '@/components/primitives/Typography';
import { Card, CardContent } from '@/components/primitives/Card';
import { cn } from '@/lib/utils';

interface UserManagementProps {
  className?: string;
}

export const UserManagement: React.FC<UserManagementProps> = ({ className }) => {
  return (
    <Card className={cn("shadow-md", className)}>
      <CardContent className="p-6">
        <Heading level={2} className="mb-4">User Management</Heading>
        <Text color="muted">User management content</Text>
      </CardContent>
    </Card>
  );
};
