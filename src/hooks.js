import { tagNames } from "./config/tags";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "preact/hooks";

function getBooleanFromString(str) {
  switch(str) {
    case 'true': return true;
    case 'false': return false;
    default: return null;
  }
}

function defaultReducer(prevState, action) {
  switch(action.type) {
    case 'patch': return { ...prevState, ...action.payload };
    case 'replace': return action.payload;
    case 'customFn': return action.payload(prevState);
    default: return prevState;
  }
}

export function useDidMountEffect(func, deps) {
  const didMount = useRef(false);
  return useEffect(() => didMount.current ? func() : didMount.current = true, deps);
}

export function useModal() {
  const { data: skipIntro, setData: setSkipIntro } = useStateWithLocalStorage('skipIntro');

  const [shouldShowModal, setShouldShowModal] = useState(!skipIntro);
  const closeModal = useCallback(() => setShouldShowModal(false), []);
  const setSkipIntroTrueToLocalStorage = useCallback(() => { setShouldShowModal(false); setSkipIntro(true) }, [])
  
  return { shouldShowModal, closeModal, setSkipIntroTrueToLocalStorage };
}

function useStateWithLocalStorage(identifier) {
  const initialData = useMemo(() => {
    const storageItem = localStorage.getItem(identifier);
    return storageItem === null ? null : JSON.parse(storageItem);
  }, []);

  const [data, setData] = useState(initialData);

  useDidMountEffect(() => {
    data === null
      ? localStorage.removeItem(identifier)
      : localStorage.setItem(identifier, JSON.stringify(data));
  }, [data]);

  return { data, setData };
}

export function useTags() {
  const { queryParams: tagsQueryParams, setQueryParams } = useQueryParams(tagNames);
  
  const initialTags = useMemo(() => getTagsFromQueryParams(tagsQueryParams), []);
  const [tags, dispatchTags] = useReducer(defaultReducer, initialTags);
  const cycleTagState = useCallback((tag, delta) => dispatchTags({ 
    type: 'customFn', 
    payload: prevState => ({ ...prevState, [tag]: getCycledTagState(prevState[tag], delta) }),
  }), [dispatchTags]);
  
  useDidMountEffect(() => setQueryParams(getQueryParamsFromTags(tags)), [tags]);
  
  return { tags, cycleTagState };
}

function getCycledTagState(prevState, delta) {
  const states = [null, true, false];
  const prevStateIndex = states.findIndex(state => state === prevState);
  return states[(((prevStateIndex + delta) % states.length) + states.length) % states.length];
}

function useQueryParams(queryParamsNames) {
  const initialQueryParams = useMemo(() => getQueryParams(queryParamsNames), [queryParamsNames]);
  const [queryParams, setQueryParams] = useState(initialQueryParams);
  
  useDidMountEffect(() => history.pushState({}, '', getUrlWithUpdatedSearchParams(queryParams)), [queryParams]);
  
  return { queryParams, setQueryParams };
}

function getQueryParamsFromTags(tags) {
  return Object.entries(tags).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'boolean' ? String(value) : undefined;
    return acc;
  }, {});
}

function getTagsFromQueryParams(queryParams) {
  return Object.entries(queryParams).reduce((acc, [key, value]) => {
    acc[key] = getBooleanFromString(value);
    return acc;
  }, {});
}

function getQueryParams(queryParamsNames) {
  const searchParams = new URLSearchParams(window.location.search);
  return queryParamsNames.reduce((acc, paramName) => {
    acc[paramName] = searchParams.get(paramName);
    return acc;
  }, {});
}

function getUrlWithUpdatedSearchParams(queryParams) {
  const url = new URL(window.location);
  Object.entries(queryParams).forEach(
    ([key, value]) => value === undefined 
      ? url.searchParams.delete(key) 
      : url.searchParams.set(key, value)
  );
  
  return url;
}

export function usePage() {
  const { queryParams: { page: pageQueryParam }, setQueryParams } = useQueryParams(['page']);

  const initialPage = useMemo(() => getPageFromQueryParam(pageQueryParam), []);
  const [page, setPage] = useState(initialPage);

  useEffect(() => setQueryParams({ page: String(page) }), [page]);

  return { page, setPage };
}

function getPageFromQueryParam(str) {
  const page = Number(str);
  return !isNaN(page) && Number.isInteger(page) && page >= 1 ? page : 1;
}
