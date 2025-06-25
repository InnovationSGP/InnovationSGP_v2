export const getMediaURL = (obj: any) => {
  const url = obj?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  return url
}

export const getCurrentYear = (): number => { return new Date().getFullYear(); };

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return '';
}



