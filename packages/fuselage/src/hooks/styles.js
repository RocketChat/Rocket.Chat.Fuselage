import { useEffect, useLayoutEffect, useMemo, useState } from 'react';


const flatMap = (arr, map = (x) => x) => {
  if (arr.flatMap) {
    return arr.flatMap(map);
  }

  const result = [];

  for (const [index, elem] of arr.entries()) {
    const x = map(elem, index, arr);

    if (Array.isArray(x)) {
      result.push(...x);
    } else {
      result.push(x);
    }
  }

  return result;
};

export const useStyle = (styles, rootClassName, modifiers = {}, forwardedClassName) => {
  useLayoutEffect(() => {
    styles.use();
    return () => {
      try {
        styles.unuse();
      } catch (error) {
        console.warn(error);
      }
    };
  }, [styles]);

  return useMemo(() => flatMap([
    styles.locals[rootClassName],
    ...Object.entries(modifiers).map(([modifier, value]) => [
      typeof value === 'boolean' && value && styles.locals[`${ rootClassName }--${ modifier }`],
      typeof value !== 'boolean' && value && styles.locals[`${ rootClassName }--${ modifier }-${ value }`],
      typeof value !== 'boolean' && value && styles.locals[`${ rootClassName }--${ value }`],
    ]),
    forwardedClassName,
  ]).filter(Boolean).join(' '),
  [modifiers, forwardedClassName]);
};

const useMediaQueryHook = (effect) => (query, defaultState = true) => {
  const [state, setState] = useState(defaultState);

  effect(() => {
    if (!query) {
      return;
    }

    let mounted = true;
    const mql = window.matchMedia(query);

    const handleChange = () => {
      if (!mounted) {
        return;
      }

      setState(!!mql.matches);
    };

    mql.addListener(handleChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(handleChange);
    };
  }, [query]);

  return state;
};

export const useMediaQuery = useMediaQueryHook(useEffect);
export const useLayoutMediaQuery = useMediaQueryHook(useLayoutEffect);
