'use client';

import React from 'react';
import { GisMineMap } from '../../shared/components/GisMineMap';

interface SimpleMineMapProps {
  isCritical?: boolean;
}

export function SimpleMineMap({ isCritical = false }: SimpleMineMapProps) {
  return <GisMineMap isUserView={true} selectedZoneId="ZONE-01" />;
}
