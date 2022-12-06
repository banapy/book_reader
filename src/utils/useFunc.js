import { useCallback, useEffect, useRef, useState } from "react";

export function usePersistFn(fn) {
   const fnRef = useRef();
   fnRef.current = fn;

   const persist = useCallback((...rest) => {
      return fnRef.current(...rest);
   }, []);

   return persist
}
