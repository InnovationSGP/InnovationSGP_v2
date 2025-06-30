export const getMediaURL = (obj: any) => {
  try {
    // Debug logging to diagnose issues
    const hasEmbedded = !!obj?._embedded;
    const hasFeaturedMedia = !!obj?._embedded?.["wp:featuredmedia"];
    const mediaCount = obj?._embedded?.["wp:featuredmedia"]?.length || 0;

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

export const getTeamMedia = (obj: any) => {
  try {
    // First check for ACF fields (common in WordPress)
    if (obj?.acf?.featured_image) {
      return obj.acf.featured_image;
    }

    // Then try other common ACF image fields
    if (obj?.acf?.profile_image?.url) {
      return obj.acf.profile_image.url;
    }

    if (obj?.acf?.profile_image) {
      return obj.acf.profile_image;
    }

    if (obj?.acf?.member_image) {
      return obj.acf.member_image;
    }

    if (obj?.acf?.member_avatar?.url) {
      return obj.acf.member_avatar.url;
    }

    if (obj?.acf?.member_avatar) {
      return obj.acf.member_avatar;
    }

    // Check for WordPress REST API embedded media
    if (obj?._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return obj._embedded["wp:featuredmedia"][0].source_url;
    }

    // Try specific fields that might exist directly on the object
    if (obj?.featured_media_url) {
      return obj.featured_media_url;
    }

    if (obj?.source_url) {
      return obj.source_url;
    }

    if (obj?.media_url) {
      return obj.media_url;
    }

    // Special case: If we have a media endpoint from _links
    if (obj?._links?.["wp:featuredmedia"]?.[0]?.href) {
      // WordPress API pattern for media in wp-json
      const mediaEndpoint = obj._links["wp:featuredmedia"][0].href;

      // Extract ID and domain
      const mediaIdMatch = mediaEndpoint.match(/\/media\/(\d+)/);
      const domainMatch = mediaEndpoint.match(/(https?:\/\/[^\/]+)/);

      if (mediaIdMatch && mediaIdMatch[1] && domainMatch && domainMatch[1]) {
        const mediaId = mediaIdMatch[1];
        const domain = domainMatch[1];

        // Try some common WordPress patterns for media files
        // Since we can't perform a fetch in a synchronous function, we have to guess

        // Pattern 1: Common WordPress REST API
        if (obj.featured_media && typeof obj.featured_media === "number") {
          return `${domain}/wp-content/uploads/${obj.featured_media}.jpg`;
        }

        // Pattern 2: If we have ACF fields that reference the ID
        if (
          obj?.acf?.featured_media &&
          typeof obj.acf.featured_media === "number"
        ) {
          return `${domain}/wp-content/uploads/${obj.acf.featured_media}.jpg`;
        }

        // Pattern 3: Use mediaId from endpoint
        // Try multiple common WordPress image locations with different formats

        // Current year/month pattern
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");

        // Try multiple patterns common in WordPress
        const possibleUrls = [
          // Pattern: YYYY/MM structure
          `${domain}/wp-content/uploads/${year}/${month}/${mediaId}.jpg`,
          `${domain}/wp-content/uploads/${year}/${month}/${mediaId}.png`,
          `${domain}/wp-content/uploads/${year}/${month}/${mediaId}.jpeg`,

          // Pattern: YYYY structure
          `${domain}/wp-content/uploads/${year}/${mediaId}.jpg`,
          `${domain}/wp-content/uploads/${year}/${mediaId}.png`,

          // Pattern: Direct in uploads folder
          `${domain}/wp-content/uploads/${mediaId}.jpg`,
          `${domain}/wp-content/uploads/${mediaId}.png`,

          // Pattern: media folder
          `${domain}/wp-content/uploads/media/${mediaId}.jpg`,
          `${domain}/wp-content/uploads/media/${mediaId}.png`,

          // WordPress.com specific pattern
          `${domain}/wp-content/uploads/sites/\\d+/${mediaId}.jpg`,

          // WordPress.com subdomain pattern
          `https://i\\d.wp.com/[^/]+/wp-content/uploads/[^/]+/${mediaId}.jpg`,

          // Last resort, just return the mediaId URL
          `${domain}/wp-content/uploads/featured-${mediaId}.jpg`,
        ];

        // For debugging
        console.log(
          `Trying to find image for media ID ${mediaId} from ${domain}`
        );

        // Since we can't actually test these URLs, we'll return the first pattern
        // In a production app, you would fetch the mediaEndpoint to get the actual URL
        return possibleUrls[0];
      }

      // If all else fails, we can actually use the media endpoint in a workaround
      // This is for development only and assumes the featured image is the actual image
      // In a real application, you would fetch this endpoint to get the actual image URL
      return mediaEndpoint;
    }

    // Final fallback
    return "";
  } catch (error) {
    console.error("Error getting team media URL:", error);
    return "";
  }
};

// Asynchronous version that actually fetches the media endpoint
export const getTeamMediaAsync = async (obj: any): Promise<string> => {
  try {
    // First check synchronous options
    const syncResult = getTeamMedia(obj);
    if (syncResult) return syncResult;

    // If we have a media endpoint from _links but no direct URL
    if (obj?._links?.["wp:featuredmedia"]?.[0]?.href) {
      const mediaEndpoint = obj._links["wp:featuredmedia"][0].href;

      try {
        // Fetch the media endpoint to get the actual image URL
        const response = await fetch(mediaEndpoint);
        if (!response.ok) throw new Error("Failed to fetch media endpoint");

        const mediaData = await response.json();

        // Check for source_url in the response
        if (mediaData.source_url) {
          return mediaData.source_url;
        }

        // Try media_details.sizes
        if (mediaData.media_details?.sizes) {
          const sizes = mediaData.media_details.sizes;
          const url =
            sizes.full?.source_url ||
            sizes.large?.source_url ||
            sizes.medium?.source_url ||
            sizes.thumbnail?.source_url;
          if (url) return url;
        }

        // Try guid.rendered
        if (mediaData.guid?.rendered) {
          return mediaData.guid.rendered;
        }
      } catch (fetchError) {
        console.error("Error fetching media endpoint:", fetchError);
        // Fall back to the synchronous guess
        return getTeamMedia(obj);
      }
    }

    // Final fallback
    return "";
  } catch (error) {
    console.error("Error getting team media URL async:", error);
    return "";
  }
};
