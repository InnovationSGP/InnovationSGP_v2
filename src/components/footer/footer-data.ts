import { fetchAPI } from "@/config/api";
import { fixedUrls } from "@/components/header/nav-items";

// Type definitions for footer data
export interface CTAFeature {
  icon_type: string;
  text: string;
}

export interface CTAStat {
  number: string;
  label: string;
}

export interface FooterData {
  acf: {
    // CTA Section data
    footerlabel?: string;
    footerheaderwhite?: string;
    footerheader?: string;
    footerdescription?: string;
    footerfeatures?: CTAFeature[];
    footerstats?: CTAStat[];
    footerbutton1?: string;
    footerbutton2?: string;
    cta_primary_button_link?: string;
    cta_secondary_button_link?: string;

    // Why Choose Us data
    chose_us_label?: string;
    chose_us_color_title?: string;
    chose_us_plain_title?: string;
    chose_us_description?: string;
    chose_us_list?: string[];

    // Footer information
    footer_description?: string;
    contact_address?: string;
    contact_email?: string;
    contact_phone?: string;
    footer_project?: string;
    footer_client_satisfaction?: string;
    footer_industry_awards?: string;
  };
}

/**
 * Fetches and normalizes footer data from the API.
 * Returns structured data with sensible defaults if API call fails.
 */
export async function getFooterData(): Promise<{ data: FooterData }> {
  try {
    const response = await fetchAPI({ endpoint: "pages/322" });

    // Default values
    const defaultFeatures = [
      { icon_type: "target", text: "Strategic Planning" },
      { icon_type: "users", text: "Expert Team" },
      { icon_type: "checkCircle", text: "Proven Results" },
    ];

    const defaultStats = [
      {
        number: response?.acf?.footer_project || "500+",
        label: "Projects Delivered",
      },
      {
        number: response?.acf?.footer_client_satisfaction || "98%",
        label: "Client Satisfaction",
      },
      {
        number: response?.acf?.footer_industry_awards || "50+",
        label: "Industry Awards",
      },
    ];

    const defaultWhyChooseUs = {
      chose_us_label: "Why Choose Us",
      chose_us_color_title: "Success",
      chose_us_plain_title: "Solutions Today for Tomorrow's",
      chose_us_description:
        "Accelerate Growth with Vertical Tech and Emerging Innovations. Empower dynamic industries through modern solutions and strong team collaboration.",
      chose_us_list: [
        "Strategic growth planning",
        "Technology for Maximum Impact",
        "Expert consultants in your industry",
        "Proven methodology and frameworks",
      ],
    };

    // Normalize the data structure
    const normalizedData: FooterData = {
      ...response,
      acf: {
        ...response?.acf,
        // Ensure CTA data exists
        footerfeatures: response?.acf?.footerfeatures || defaultFeatures,
        footerstats: response?.acf?.footerstats || defaultStats,
        // Ensure WhyChooseUs data exists
        chose_us_label:
          response?.acf?.chose_us_label || defaultWhyChooseUs.chose_us_label,
        chose_us_color_title:
          response?.acf?.chose_us_color_title ||
          defaultWhyChooseUs.chose_us_color_title,
        chose_us_plain_title:
          response?.acf?.chose_us_plain_title ||
          defaultWhyChooseUs.chose_us_plain_title,
        chose_us_description:
          response?.acf?.chose_us_description ||
          defaultWhyChooseUs.chose_us_description,
        chose_us_list:
          response?.acf?.chose_us_list || defaultWhyChooseUs.chose_us_list,
      },
    };

    return {
      data: normalizedData,
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    // Return fallback data
    return {
      data: {
        acf: {
          // CTA Section defaults
          footerfeatures: [
            { icon_type: "target", text: "Strategic Planning" },
            { icon_type: "users", text: "Expert Team" },
            { icon_type: "checkCircle", text: "Proven Results" },
          ],
          footerstats: [
            { number: "500+", label: "Projects Delivered" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "50+", label: "Industry Awards" },
          ],
          footerlabel: "Transform Your Business Today",
          footerheaderwhite: "Ready to Scale",
          footerheader: "Beyond Limits?",
          footerdescription:
            "Join industry leaders who've transformed their operations with our cutting-edge consulting solutions. Your next breakthrough is just one conversation away.",
          footerbutton1: "Schedule Free Consultation",
          cta_primary_button_link: fixedUrls.letsTalk,
          footerbutton2: "View Case Studies",
          cta_secondary_button_link: "/service",

          // WhyChooseUs defaults
          chose_us_label: "Why Choose Us",
          chose_us_color_title: "Success",
          chose_us_plain_title: "Solutions Today for Tomorrow's",
          chose_us_description:
            "Accelerate Growth with Vertical Tech and Emerging Innovations. Empower dynamic industries through modern solutions and strong team collaboration.",
          chose_us_list: [
            "Strategic growth planning",
            "Technology for Maximum Impact",
            "Expert consultants in your industry",
            "Proven methodology and frameworks",
          ],

          // Footer contact info defaults
          footer_description:
            "Project Management as a Service. Built for Complexity. Focused on Results.",
          contact_address: "1234 Innovation Way, Suite 500, Anytown, USA 12345",
          contact_email: "info@innovationsgp.com",
          contact_phone: "+1 (555) 123-4567",
        },
      },
    };
  }
}
