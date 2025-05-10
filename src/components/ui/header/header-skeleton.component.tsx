import { Skeleton } from "@components/shared/skeleton/skeleton.component";

export function AuthSkeleton() {
  return (
    <div data-testid='auth-skeleton' className='flex items-center gap-2'>
      <Skeleton width={32} height={32} circle />
      <Skeleton width={80} height={32} />
    </div>
  );
}
