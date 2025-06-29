export const getMediaURL = (obj: any) => {
  try {
    // Debug logging to diagnose issues
    const hasEmbedded = !!obj?._embedded;
    const hasFeaturedMedia = !!obj?._embedded?.["wp:featuredmedia"];
    const mediaCount = obj?._embedded?.["wp:featuredmedia"]?.length || 0;

    console.log("getMediaURL debug:", {
      hasEmbedded,
      hasFeaturedMedia,
      mediaCount,
      objectType: typeof obj,
      hasACF: !!obj?.acf,
    });

    // First try to get the URL from embedded media
    let url = obj?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    // If that fails, try to get from specific sizes in media details
    if (
      !url &&
      obj?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
    ) {
      const sizes = obj._embedded["wp:featuredmedia"][0].media_details.sizes;
      url =
        sizes.full?.source_url ||
        sizes.large?.source_url ||
        sizes.medium?.source_url;
    }

    // If featured media is missing, check for fallback fields
    if (!url && obj?.acf?.featured_image) {
      return obj.acf.featured_image;
    }

    // Fallback for direct media_url property
    if (!url && obj?.media_url) {
      return obj.media_url;
    }

    // Final fallback
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
