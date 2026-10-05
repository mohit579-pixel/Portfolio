import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PROJECTS } from '../data/projects';
import { projectHref, RouterContext } from './routing';

// Hash routing: "#/p/P-01" opens a project page, anything else is the home page.
// Works on any static host with no rewrite rules, and the back button and
// direct links work because the route always comes from location.hash.

function parse(hash) {
  const m = /^#\/p\/([\w-]+)$/.exec(hash);
  return m && PROJECTS.some((p) => p.id === m[1]) ? m[1] : null;
}

export function RouterProvider({ children }) {
  const [projectId, setProjectId] = useState(() => parse(window.location.hash));
  const current = useRef(projectId);
  const homeScrollY = useRef(0); // where the visitor was on the home page
  const pendingSection = useRef(null); // section to scroll to after returning home
  const prevRendered = useRef(projectId);

  const sync = useCallback(() => {
    const id = parse(window.location.hash);
    if (!current.current && id) homeScrollY.current = window.scrollY;
    current.current = id;
    setProjectId(id);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [sync]);

  // Scroll after the route has rendered: top of a project page, or back to
  // where the visitor left the home page (or to a requested section).
  useLayoutEffect(() => {
    if (prevRendered.current === projectId) return;
    prevRendered.current = projectId;
    if (projectId) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const target = pendingSection.current && document.getElementById(pendingSection.current);
    pendingSection.current = null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: homeScrollY.current, behavior: 'instant' });
  }, [projectId]);

  const value = useMemo(() => {
    const leaveProject = () => {
      history.pushState(null, '', window.location.pathname + window.location.search);
      sync();
    };
    return {
      projectId,
      openProject: (id) => {
        window.location.hash = projectHref(id);
      },
      goHome: () => {
        if (current.current) leaveProject();
      },
      goSection: (id) => {
        if (current.current) {
          pendingSection.current = id;
          leaveProject();
        } else {
          document.getElementById(id)?.scrollIntoView();
        }
      },
    };
  }, [projectId, sync]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
