/**
 * Overlay Component Tokens
 *
 * Component-level design tokens for Overlay components (Modal, Dialog, Backdrop).
 * Maps foundation tokens (spacing, radius, shadows, motion) to overlay-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Overlay Component Tokens
 *
 * Defines tokens for backdrop variants, modal sizes, and animations.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const OVERLAY_TOKENS = {
  /**
   * Backdrop tokens by variant
   * Maps to SURFACE_TOKENS for background colors
   */
  backdrop: {
    default: {
      bg: "bg-black/50", // Maps to surface overlay opacity
      opacity: "opacity-100",
    },
    blurred: {
      bg: "bg-black/50", // Maps to surface overlay opacity
      opacity: "opacity-100",
      backdropFilter: "backdrop-blur-sm", // Maps to backdrop blur utilities
    },
    transparent: {
      bg: "bg-transparent",
      opacity: "opacity-0",
    },
  } as const,

  /**
   * Modal tokens by size variant
   * Maps to foundation tokens for spacing, radius, and shadows
   */
  modal: {
    radius: {
      sm: "rounded-md", // 6px - maps to borderRadius.md / componentRadius.modal.sm
      md: "rounded-lg", // 8px - maps to borderRadius.lg / componentRadius.modal.md
      lg: "rounded-xl", // 12px - maps to borderRadius.xl / componentRadius.modal.lg
      xl: "rounded-2xl", // 16px - maps to borderRadius.2xl / componentRadius.modal.xl
      fullscreen: "rounded-none", // No radius - maps to borderRadius.none
    } as const,
    padding: {
      sm: "p-md", // 16px - maps to semanticSpacing.md
      md: "p-lg", // 24px - maps to semanticSpacing.lg
      lg: "p-xl", // 32px - maps to semanticSpacing.xl
      xl: "p-xl", // 32px - maps to semanticSpacing.xl (same as lg)
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
      lg: "shadow-xl", // Maps to elevationShadows.xl
      xl: "shadow-xl", // Maps to elevationShadows.xl (same as lg)
    } as const,
    maxWidth: {
      sm: "max-w-md", // 448px
      md: "max-w-lg", // 512px
      lg: "max-w-2xl", // 672px
      xl: "max-w-4xl", // 896px
      fullscreen: "max-w-full", // Full width
    } as const,
    /**
     * Modal surface tokens by variant
     * Note: primary and tinted are defined in SURFACE_TOKENS.modal.surface
     * Only secondary and bare are defined here in OVERLAY_TOKENS
     */
    surface: {
      secondary: {
        bg: "bg-card", // Maps to elevated surface
        border: "border border-border", // Maps to border
        shadow: "shadow-sm", // Maps to elevation shadow
      } as const,
      bare: {
        bg: "bg-transparent", // No background
        border: "border-none", // No border
        shadow: "shadow-none", // No shadow
      } as const,
    } as const,
    /**
     * Modal position tokens
     * For centering and positioning modal content
     */
    position: {
      center: "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2", // Center positioning
    } as const,
    /**
     * Modal transition tokens
     * Maps to motion tokens for appear/disappear animations
     */
    transition: {
      appear: "tm-motion-fade-scale", // Maps to OVERLAY_TOKENS.animation.enter.combined
      disappear: "tm-motion-fade-scale-out", // Maps to OVERLAY_TOKENS.animation.exit.combined
    } as const,
  } as const,

  /**
   * Animation tokens for overlay enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: {
      duration: "duration-normal", // 250ms - maps to motion V2 durations.normal
      easing: "ease-out", // Maps to motion V2 easings.standard
      keyframes: "tm-motion-fade-in", // Motion V2 fade in
      scale: "tm-motion-scale-in", // Motion V2 scale in
      combined: "tm-motion-fade-scale", // Motion V2 fade + scale
    } as const,
    exit: {
      duration: "duration-fast", // 150ms - maps to motion V2 durations.fast
      easing: "ease-in", // Maps to motion V2 easings.standard
      keyframes: "tm-motion-fade-out", // Motion V2 fade out
      scale: "tm-motion-scale-out", // Motion V2 scale out
      combined: "tm-motion-fade-scale-out", // Motion V2 fade + scale out
    } as const,
  } as const,
} as const;

/**
 * Type exports for Overlay tokens
 */
export type OverlayBackdropVariant = keyof typeof OVERLAY_TOKENS.backdrop;
export type OverlayModalSize = keyof typeof OVERLAY_TOKENS.modal.radius;
