import { fetchAPI } from "@/config/api";

export async function getFooterData() {
  try {
    const response = await fetchAPI({ endpoint: "pages/322" });
    // Create default CTA features if they don't exist in the API response
    const defaultFeatures = [
      { icon_type: "target", text: "Strategic Planning" },
      { icon_type: "users", text: "Expert Team" },
      { icon_type: "checkCircle", text: "Proven Results" },
    ];

    // Create default CTA stats if they don't exist in the API response
    const defaultStats = [
      { number: "30+", label: "Projects Delivered" },
      { number: "98%", label: "Client Satisfaction" },
    ];

    // If the API response doesn't include CTA data, add it with defaults
    if (response && response.acf && !response.acf.cta_features) {
      response.acf.cta_features = defaultFeatures;
    }

    if (response && response.acf && !response.acf.cta_stats) {
      response.acf.cta_stats = defaultStats;
    }

    return {
      data: response,
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {
      data: {
        acf: {
          cta_features: [
            { icon_type: "target", text: "Strategic Planning" },
            { icon_type: "users", text: "Expert Team" },
            { icon_type: "checkCircle", text: "Proven Results" },
          ],
          cta_stats: [
            { number: "500+", label: "Projects Delivered" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "50+", label: "Industry Awards" },
          ],
          cta_badge_text: "Transform Your Business Today",
          cta_headline_start: "Ready to Scale",
          cta_headline_highlight: "Beyond Limits?",
          cta_description:
            "Join industry leaders who've transformed their operations with our cutting-edge consulting solutions. Your next breakthrough is just one conversation away.",
          cta_primary_button_text: "Schedule Free Consultation",
          cta_primary_button_link: "#contact",
          cta_secondary_button_text: "View Case Studies",
          cta_secondary_button_link: "#case-studies",
          cta_trust_text: "Trusted by leading companies worldwide",
          cta_rating_text: "4.9/5",
          cta_review_count: "from 200+ reviews",
        },
      },
    };
  }
}
