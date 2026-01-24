import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/pokemon'); // or '/dashboard', etc.
}
