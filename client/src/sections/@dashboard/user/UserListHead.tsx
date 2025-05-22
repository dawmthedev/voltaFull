import React from 'react';

export interface HeadCell {
  id: string;
  name: string;
  alignRight?: boolean;
}

export interface UserListHeadProps {
  headLabel: HeadCell[];
}

export default function UserListHead({ headLabel }: UserListHeadProps) {
  return (
    <thead>
      <tr>
        {headLabel.map((h) => (
          <th key={h.id}>{h.name}</th>
        ))}
      </tr>
    </thead>
  );
}
