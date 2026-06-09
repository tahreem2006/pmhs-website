'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleRedirect() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role;
      if (role) {
        router.push(`/${role}`);
      }
    }
  }, [isLoaded, user, router]);

  return null; 
}