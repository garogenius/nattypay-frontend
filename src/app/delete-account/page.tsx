import DeleteAccountPage from '@/features/delete-account/pages/DeleteAccountPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account | NattyPay',
  description: 'Request account deletion for your NattyPay account.',
};

export default function Page() {
  return <DeleteAccountPage />;
}
