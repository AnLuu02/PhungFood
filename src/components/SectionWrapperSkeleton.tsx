// components/common/loading-skeleton.tsx
import { Box, Skeleton } from '@mantine/core';
import clsx from 'clsx';

type LoadingSkeletonVariant = 'page' | 'card' | 'table' | 'list' | 'detail' | 'form' | 'custom';

interface LoadingSkeletonProps {
  variant?: LoadingSkeletonVariant;

  /**
   * Dùng cho custom variant
   */
  rows?: number;

  /**
   * className wrapper ngoài
   */
  className?: string;

  /**
   * Hiển thị avatar / image
   */
  withAvatar?: boolean;

  /**
   * Hiển thị header
   */
  withHeader?: boolean;

  /**
   * Custom content
   */
  children?: React.ReactNode;
}

/**
 * Common reusable loading skeleton
 *
 * Mantine v7 + TailwindCSS
 */
export function LoadingSkeleton({
  variant = 'page',
  rows = 4,
  className,
  withAvatar = false,
  withHeader = true,
  children
}: LoadingSkeletonProps) {
  if (variant === 'custom') {
    return <Box className={clsx('space-y-4', className)}>{children}</Box>;
  }

  if (variant === 'card') {
    return (
      <div className={clsx('rounded-2xl border border-gray-200 bg-white p-4 shadow-sm', 'space-y-4', className)}>
        <Skeleton h={180} radius='lg' />

        <Box className='space-y-2'>
          <Skeleton h={24} w='70%' radius='md' />
          <Skeleton h={16} w='100%' radius='md' />
          <Skeleton h={16} w='90%' radius='md' />
        </Box>

        <Box className='flex justify-between pt-2'>
          <Skeleton h={36} w={120} radius='xl' />
          <Skeleton h={36} w={80} radius='xl' />
        </Box>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={clsx('overflow-hidden rounded-2xl border border-gray-200 bg-white', className)}>
        {/* header */}
        <Box className='grid grid-cols-4 gap-4 border-b p-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} h={20} radius='md' />
          ))}
        </Box>

        {/* rows */}
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className='grid grid-cols-4 gap-4 border-b p-4 last:border-none'>
            {Array.from({ length: 4 }).map((_, col) => (
              <Skeleton key={col} h={18} radius='md' />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <Box className={clsx('space-y-4', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className='flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4'>
            {withAvatar && <Skeleton circle h={48} w={48} />}

            <Box className='flex-1 space-y-2'>
              <Skeleton h={18} w='40%' radius='md' />
              <Skeleton h={14} w='90%' radius='md' />
            </Box>
          </div>
        ))}
      </Box>
    );
  }

  if (variant === 'detail') {
    return (
      <Box className={clsx('space-y-6', className)}>
        <Skeleton h={300} radius='xl' />

        <Box className='space-y-3'>
          <Skeleton h={32} w='60%' radius='md' />
          <Skeleton h={18} w='100%' radius='md' />
          <Skeleton h={18} w='95%' radius='md' />
          <Skeleton h={18} w='90%' radius='md' />
        </Box>

        <Box className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} h={100} radius='xl' />
          ))}
        </Box>
      </Box>
    );
  }

  if (variant === 'form') {
    return (
      <div className={clsx('rounded-2xl border border-gray-200 bg-white p-6', 'space-y-6', className)}>
        {withHeader && (
          <Box className='space-y-2'>
            <Skeleton h={28} w='40%' radius='md' />
            <Skeleton h={16} w='70%' radius='md' />
          </Box>
        )}

        {Array.from({ length: rows }).map((_, i) => (
          <Box key={i} className='space-y-2'>
            <Skeleton h={14} w={120} radius='md' />
            <Skeleton h={42} radius='md' />
          </Box>
        ))}

        <Box className='flex justify-end gap-3 pt-2'>
          <Skeleton h={40} w={100} radius='xl' />
          <Skeleton h={40} w={140} radius='xl' />
        </Box>
      </div>
    );
  }

  /**
   * default page skeleton
   */
  return (
    <Box className={clsx('space-y-6', className)}>
      {withHeader && (
        <Box className='space-y-3'>
          <Skeleton h={36} w='35%' radius='md' />
          <Skeleton h={18} w='60%' radius='md' />
        </Box>
      )}

      <Box className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingSkeleton key={i} variant='card' />
        ))}
      </Box>
    </Box>
  );
}
