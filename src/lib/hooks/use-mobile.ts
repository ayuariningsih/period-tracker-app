import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

// 1. Factory function encapsulates the logic
export function makeMediaQueryHook(mediaQuery: string) {
  // These functions are defined OUTSIDE the returned hook.
  // Their references remain stable for the lifetime of the created hook.
  function getSnapshot() {
    return window.matchMedia(mediaQuery).matches;
  }

  function subscribe(callback: () => void) {
    const mql = window.matchMedia(mediaQuery);
    mql.addEventListener("change", callback);

    return () => {
      mql.removeEventListener("change", callback);
    };
  }

  function getServerSnapshot() {
    return false;
  }

  // 2. Returns the actual hook to be used in your components
  return function useMediaQuery() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  };
}

// 3. Create your specific useIsMobile hook using the factory
export const useIsMobile = makeMediaQueryHook(MOBILE_QUERY);
