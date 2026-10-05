import { createContext, useContext } from 'react';

export const RouterContext = createContext(null);

export const projectHref = (id) => '#/p/' + id;

export const useRouter = () => useContext(RouterContext);
