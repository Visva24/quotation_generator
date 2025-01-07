import { redirect } from 'next/navigation';

export default function RootRedirect() { 
  redirect('/log-in');
}