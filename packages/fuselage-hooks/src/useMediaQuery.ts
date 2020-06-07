import { useEffect, useState } from 'react';

import { isRunningOnBrowser } from './helpers';

/**
 * Hook to listen to a media query.
 *
 * @param [query] - the CSS3 media query expression
 * @return `true` if the media query matches; `false` is it does not match or the query is not defined
 */
export const useMediaQuery = (query?: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (!query || !isRunningOnBrowser) {
      return false;
    }

    const { matches } = window.matchMedia(query);
    return !!matches;
  });

  useEffect(() => {
    if (!query || !isRunningOnBrowser) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (): void => {
      setMatches(!!mediaQueryList.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return (): void => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};
