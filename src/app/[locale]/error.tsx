'use client';
import { ErrorState } from '@/shared/ui/ErrorState';
import { useRouter } from 'next/navigation';

export default function ErrorWrapper() {
  const router = useRouter();

  return (
    <>
      <div className="globalError">
        <div className="container">
          <ErrorState onRetry={() => router.refresh()} />
        </div>
      </div>
    </>
  );
}
