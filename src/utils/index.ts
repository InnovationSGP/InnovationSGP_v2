export const getMediaURL = (obj: any) => {
  try {
    // First check embedded media (most common and reliable when _embed is used)
    if (obj?._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      return sanitizeImageUrl(obj._embedded["wp:featuredmedia"][0].source_url);
    }

    // Check for media in different sizes
    if (obj?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes) {
      const sizes = obj._embedded["wp:featuredmedia"][0].media_details.sizes;
      const url =
        sizes.full?.source_url ||
        sizes.large?.source_url ||
        sizes.medium_large?.source_url ||
        sizes.medium?.source_url ||
        sizes.thumbnail?.source_url;

      if (url) return sanitizeImageUrl(url);
    }

    // Check for Yoast SEO og:image
    if (obj?.yoast_head_json?.og_image?.[0]?.url) {
      return sanitizeImageUrl(obj.yoast_head_json.og_image[0].url);
    }

    // Check for ACF fields (common in WordPress)
    if (obj?.acf?.featured_image) {
      return sanitizeImageUrl(obj.acf.featured_image);
    }

    // Check for direct featured_media URL
    if (obj?.jetpack_featured_media_url) {
      return sanitizeImageUrl(obj.jetpack_featured_media_url);
    }

    // Try to construct URL from featured_media ID and site URL
    if (obj?.featured_media && typeof obj.featured_media === "number") {
      // Try to determine WordPress URL from available information
      let wpBaseUrl = "";

      // Try to extract domain from _links
      if (obj?._links?.self?.[0]?.href) {
        const urlMatch = obj._links.self[0].href.match(/(https?:\/\/[^\/]+)/);
        if (urlMatch && urlMatch[1]) {
          wpBaseUrl = urlMatch[1];
        }
      }

      // If we found a URL, construct a path
      if (wpBaseUrl) {
        return sanitizeImageUrl(
          `${wpBaseUrl}/wp-json/wp/v2/media/${obj.featured_media}?_fields=source_url`
        );
      }
    }

    // If no image was found
    console.log(
      "No featured image found for post:",
      obj?.title?.rendered || obj?.id || "Unknown post"
    );
    return "/images/blog-read.png"; // Fallback image
  } catch (error) {
    console.error("Error getting media URL:", error);
    return "/images/blog-read.png"; // Fallback on error
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

/**
 * Utility function to sanitize image URLs for Next.js Image component
 * @param url The image URL to sanitize
 * @param fallbackUrl Optional fallback URL if the provided URL is invalid
 * @returns A sanitized URL that's safe to use with Next.js Image component
 */
export const sanitizeImageUrl = (
  url: string | undefined,
  fallbackUrl: string = "/images/blog-read.png"
): string => {
  if (!url) return fallbackUrl;

  try {
    // Remove HTML entities if present
    url = url.replace(/&amp;/g, "&");

    // Check if URL is relative and needs to be made absolute
    if (url.startsWith("/")) {
      // Attempt to use NEXT_PUBLIC_WORDPRESS_URL if available
      const wpBaseUrl =
        process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://innovationsgp.com";
      url = `${wpBaseUrl}${url}`;
    }

    // Handle protocol-relative URLs (//example.com/image.jpg)
    if (url.startsWith("//")) {
      url = `https:${url}`;
    }

    // Parse the URL to check if it's valid
    const parsedUrl = new URL(url);

    // Check for IP addresses - can't use includes() since IP may be part of hostname
    const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(
      parsedUrl.hostname
    );

    // Check local hostnames
    const isLocalHost =
      parsedUrl.hostname === "localhost" ||
      parsedUrl.hostname.includes("local.") ||
      parsedUrl.hostname.includes(".local");

    // Known WordPress development hostnames that need handling
    const devHosts = ["3.147.83.251", "localhost", "127.0.0.1"];

    // If IP address or problematic host, provide a local fallback
    // For production, you'd handle IP addresses differently
    if (isIpAddress || isLocalHost || devHosts.includes(parsedUrl.hostname)) {
      console.log(`Using local image for ${url} (${parsedUrl.hostname})`);

      // For testing/development only:
      // Return the IP address URL but note in production we'd use fallback
      // This allows us to see if your WordPress server is properly returning images
      return url;

      // For production, you'd uncomment this to use fallbacks:
      // return fallbackUrl;
    }

    return url;
  } catch (e) {
    console.error("Error sanitizing image URL:", url, e);
    return fallbackUrl;
  }
};
