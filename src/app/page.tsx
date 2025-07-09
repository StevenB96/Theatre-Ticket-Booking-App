// src/app/admin/graphics/page.client.tsx or your desired redirect page
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/admin');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>{`You're being redirected...`}</h1>
        <p className={styles.subtitle}>
          If you’re not taken automatically,{' '}
          <a href="/admin" className={styles.link}>
            click here
          </a>
          .
        </p>
      </main>
    </div>
  );
}
