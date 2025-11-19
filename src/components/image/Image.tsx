import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/feedback/Skeleton';

export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type ImageShadow = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
export type ImageAspectRatio = 'square' | 'video' | 'photo' | 'wide' | string;

// Map radius to Tailwind classes
const radiusClasses: Record<ImageRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

// Map shadow to Tailwind classes
const shadowClasses: Record<ImageShadow, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  base: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
};

// Map common aspect ratios to Tailwind classes
const aspectRatioClasses: Record<string, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  photo: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

// Standard img element props
type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface ImageProps extends Omit<ImgProps, 'className'> {
  /**
   * Custom className for the image element itself
   */
  className?: string;
  /**
   * Custom className for the wrapper div container
   */
  wrapperClassName?: string;
  /**
   * Border radius for the image container
   */
  radius?: ImageRadius;
  /**
   * Shadow for the image container
   */
  shadow?: ImageShadow;
  /**
   * Aspect ratio for the image container (e.g., 'square', 'video', 'photo', 'wide', or custom like '16/9', '4/3')
   */
  aspectRatio?: ImageAspectRatio;
  /**
   * Fallback image source if the main image fails to load
   */
  fallbackSrc?: string;
  /**
   * Whether to show a skeleton loader while the image is loading
   */
  showSkeleton?: boolean;
  /**
   * Whether the image should fill its container (uses absolute positioning)
   */
  fill?: boolean;
  /**
   * Callback fired when the image has finished loading
   */
  onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
}

const ImageComponent = React.forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      className,
      wrapperClassName,
      radius = 'none',
      shadow = 'none',
      aspectRatio,
      fallbackSrc,
      showSkeleton = false,
      src,
      onLoadingComplete,
      onError,
      onLoad,
      fill,
      alt = '',
      ...imgProps
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const fallbackAttemptedRef = useRef(false);

    const handleLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = event.currentTarget;
        setIsLoaded(true);
        if (onLoadingComplete) {
          onLoadingComplete({
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          });
        }
      },
      [onLoadingComplete]
    );

    const handleError = useCallback(
      (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // If we have a fallback and haven't tried it yet, switch to fallback
        if (fallbackSrc && !fallbackAttemptedRef.current && currentSrc !== fallbackSrc) {
          fallbackAttemptedRef.current = true;
          setCurrentSrc(fallbackSrc);
          setHasError(false);
          setIsLoaded(false); // Reset loaded state when switching to fallback
          // Don't call onError yet, let it try the fallback first
          return;
        }

        // If we've already tried fallback or don't have one, mark as error
        setHasError(true);
        setIsLoaded(false); // Ensure loaded state is false on error
        if (onError) {
          onError(error);
        }
      },
      [fallbackSrc, currentSrc, onError]
    );

    // Reset states when src changes
    React.useEffect(() => {
      if (src !== currentSrc) {
        setCurrentSrc(src || undefined);
        setIsLoaded(false);
        setHasError(false);
        fallbackAttemptedRef.current = false;
      }
    }, [src, currentSrc]);

    // Build wrapper classes
    const wrapperClasses = cn(
      'relative',
      // Apply radius
      radius !== 'none' && radiusClasses[radius],
      // Apply shadow
      shadow !== 'none' && shadowClasses[shadow],
      // Apply overflow-hidden when radius is not none to prevent image overflow
      radius !== 'none' && 'overflow-hidden',
      // Apply aspect ratio
      aspectRatio && 
        (aspectRatioClasses[aspectRatio] || 
         (typeof aspectRatio === 'string' && /^\d+\/\d+$/.test(aspectRatio.trim())
           ? `aspect-[${aspectRatio.trim()}]` 
           : aspectRatio)),
      // If fill is used, ensure container is relative (already added above)
      fill && 'w-full h-full',
      wrapperClassName
    );

    // Build image classes
    const imageClasses = cn(
      // Ensure image respects container bounds when fill is used or radius is applied
      (fill || radius !== 'none') && 'object-cover',
      fill && 'absolute inset-0 w-full h-full',
      className
    );

    const shouldShowSkeleton = showSkeleton && !isLoaded && !hasError && currentSrc;

    const handleImageLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        handleLoad(event);
        if (onLoad) {
          onLoad(event);
        }
      },
      [handleLoad, onLoad]
    );

    // Don't render image if no src is provided (unless fallback exists)
    const hasValidSrc = currentSrc || fallbackSrc;

    return (
      <div ref={ref} className={wrapperClasses}>
        {shouldShowSkeleton && (
          <Skeleton className="absolute inset-0 w-full h-full z-10" />
        )}
        {hasValidSrc ? (
          <img
            {...imgProps}
            src={currentSrc}
            alt={alt}
            className={imageClasses}
            onLoad={handleImageLoad}
            onError={handleError}
          />
        ) : null}
      </div>
    );
  }
);

ImageComponent.displayName = 'Image';

export { ImageComponent as Image };

