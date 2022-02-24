import { useEffect } from "react";

export function useMountSubscription(onMountCallback, deps = []) {
  useEffect(() => {
    const subscription = onMountCallback();
    return () => subscription.unsubscribe();
  }, deps);
}
