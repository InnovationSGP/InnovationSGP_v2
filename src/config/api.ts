export const fetchAPI = async ({
  endpoint,
  method = "GET",
  data = null,
  includeHeaders = false,
}: any) => {
  const options: any = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    // More robust sanitization of the endpoint URL
    let sanitizedEndpoint = endpoint.trim();

    // Handle special characters properly using encodeURIComponent for query param values
    if (sanitizedEndpoint.includes("?")) {
      const [path, queryString] = sanitizedEndpoint.split("?");
      const searchParams = new URLSearchParams();

      // Parse and properly encode each query parameter
      queryString.split("&").forEach((param: string) => {
        if (param.includes("=")) {
          const [key, value] = param.split("=");
          searchParams.append(key.trim(), value.trim());
        }
      });

      // Reconstruct with properly encoded parameters
      sanitizedEndpoint = `${path}?${searchParams.toString()}`;
    }

    // Ensure we don't have double slashes in the URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.endsWith("/")
      ? process.env.NEXT_PUBLIC_API_URL.slice(0, -1)
      : process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_API_URL environment variable");
      throw new Error("API URL configuration is missing");
    }

    // Add _embed=true parameter if it's a WordPress API endpoint accessing posts
    // and doesn't already have it
    if (
      sanitizedEndpoint.includes("/posts") &&
      !sanitizedEndpoint.includes("_embed")
    ) {
      sanitizedEndpoint += sanitizedEndpoint.includes("?")
        ? "&_embed=true"
        : "?_embed=true";
    }

    const fullUrl = sanitizedEndpoint.startsWith("/")
      ? `${baseUrl}${sanitizedEndpoint}`
      : `${baseUrl}/${sanitizedEndpoint}`;

    console.log(`Fetching API: ${fullUrl}`);

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      console.error(`HTTP error ${response.status} for URL: ${fullUrl}`);
      const errorText = await response.text();
      console.error(`Response text: ${errorText.substring(0, 200)}...`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json(); // or response.text() if it's not JSON

    // Log a preview of the response for debugging
    console.log(`API response for ${endpoint}:`, {
      isArray: Array.isArray(responseData),
      count: Array.isArray(responseData) ? responseData.length : "Not an array",
      sample:
        Array.isArray(responseData) && responseData.length > 0
          ? {
              id: responseData[0].id,
              title: responseData[0].title?.rendered,
              hasEmbedded: !!responseData[0]._embedded,
              mediaInfo: responseData[0]._embedded?.["wp:featuredmedia"]?.[0]
                ? {
                    id: responseData[0]._embedded["wp:featuredmedia"][0].id,
                    url: responseData[0]._embedded["wp:featuredmedia"][0]
                      .source_url,
                  }
                : "No media",
            }
          : "No items",
    });

    // If headers are requested, return both data and headers
    if (includeHeaders) {
      // Extract pagination info from headers
      const totalPosts =
        response.headers.get("X-WP-Total") ||
        response.headers.get("x-wp-total");
      const totalPages =
        response.headers.get("X-WP-TotalPages") ||
        response.headers.get("x-wp-totalpages");

      console.log(
        `Pagination headers: Total posts: ${totalPosts}, Total pages: ${totalPages}`
      );

      return {
        data: responseData,
        pagination: {
          totalPosts: totalPosts ? parseInt(totalPosts) : null,
          totalPages: totalPages ? parseInt(totalPages) : null,
        },
      };
    }

    return responseData;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};
