export const getMediaURL = (obj) => {
  const url = obj?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  return url
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return '';
}
