import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminShell from './AdminShell';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Allow login page without auth
  return <AdminShell>{children}</AdminShell>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) redirect('/admin/login');
  return <>{children}</>;
}
