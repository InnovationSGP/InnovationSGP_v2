import placeholder from "../../public/images/placeholderMember.png"


export const getMediaURL = (obj: any) => {
  const url = obj?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  return url
}


// export const getMediaURL = (obj, fallbackImage) => {
//   // Use provided fallbackImage or default to imported placeholder
//   const finalFallback = fallbackImage || placeholder;
//   // Early return if no object provided
//   if (!obj) {
//     return finalFallback;
//   }
//
//   // Check if featured_media exists and has a valid ID
//   if (!obj.featured_media ||
//       obj.featured_media === 0 ||
//       obj.featured_media === '0') {
//     return finalFallback;
//   }
//
//   // Check if _embedded exists at all
//   if (!obj._embedded) {
//     return finalFallback;
//   }
//
//   // Check if wp:featuredmedia exists in _embedded
//   if (!obj._embedded['wp:featuredmedia']) {
//     return finalFallback;
//   }
//
//   // Check if the featuredmedia array has items
//   if (!Array.isArray(obj._embedded['wp:featuredmedia']) ||
//       obj._embedded['wp:featuredmedia'].length === 0) {
//     return finalFallback;
//   }
//
//   const mediaObject = obj._embedded['wp:featuredmedia'][0];
//
//   // Check if the media object exists and has a source_url
//   if (!mediaObject || !mediaObject.source_url) {
//     return finalFallback;
//   }
//
//   const url = mediaObject.source_url;
//
//   // Final validation: ensure URL is a non-empty string
//   if (typeof url === 'string' && url.trim() !== '') {
//     return url;
//   }
//
//   // Return fallback for any other case
//   return finalFallback;
// }

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return '';
}



