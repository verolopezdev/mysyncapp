import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export function useObservable<T>(observable: Observable<T>) {
  const [value, setValue] = useState<T>(() => {
    // Works for BehaviorSubject
    return (observable as any).value;
  });

  useEffect(() => {
    const sub = observable.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [observable]);

  return value;
}