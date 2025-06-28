export const getMediaURL = (obj: any) => {
  try {
    const url = obj?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    // If featured media is missing, check for fallback fields
    if (!url && obj?.acf?.featured_image) {
      return obj.acf.featured_image;
    }
    return url || "";
  } catch (error) {
    console.error("Error getting media URL:", error);
    return "";
  }
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return "";
}
