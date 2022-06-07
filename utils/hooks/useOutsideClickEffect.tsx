import { useEffect, useRef } from 'react';

/**
 * Runs a function whenever the user clicks outside of a target element.
 * @param handler - the function to call when the user clicks outside of the target element.
 * @returns ref - the ref that should be passed to the target element
 */
export default function useClickOutsideEffect(
  handler: (e: MouseEvent) => void
) {
  const ref = useRef(null);
  useEffect(() => {
    const eventHandler = (e: MouseEvent) => {
      if (ref.current && !(ref.current as any).contains(e.target)) {
        handler(e);
      }
    };
    document.addEventListener('mousedown', eventHandler);
    return () => document.removeEventListener('mousedown', eventHandler);
  }, [ref, handler]);

  return ref;
}
