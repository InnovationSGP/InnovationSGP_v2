// WordPress API Types
export interface WordPressImage {
  id: number;
  alt_text: string;
  source_url: string;
  media_details?: {
    sizes?: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface WordPressTitle {
  rendered: string;
}

export interface WordPressContent {
  rendered: string;
  protected?: boolean;
}

export interface WordPressExcerpt {
  rendered: string;
  protected?: boolean;
}

export interface WordPressYoastData {
  title?: string;
  description?: string;
  robots?: {
    index?: string;
    follow?: string;
  };
  og_image?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
}

export interface WordPressEmbedded {
  'wp:featuredmedia'?: WordPressImage[];
  'wp:term'?: Array<Array<{
    id: number;
    name: string;
    slug: string;
  }>>;
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressTitle;
  content: WordPressContent;
  excerpt: WordPressExcerpt;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  categories: number[];
  tags: number[];
  yoast_head_json?: WordPressYoastData;
  _embedded?: WordPressEmbedded;
}

export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressTitle;
  content: WordPressContent;
  excerpt: WordPressExcerpt;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  yoast_head_json?: WordPressYoastData;
  _embedded?: WordPressEmbedded;
  acf?: any; // ACF (Advanced Custom Fields) data - structure varies by page
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WordPressService extends Omit<WordPressPost, 'categories' | 'tags'> {
  // Service-specific fields can be added here
}

export interface WordPressTestimonial extends Omit<WordPressPost, 'categories' | 'tags'> {
  // Testimonial-specific fields can be added here
}

// API Response Types
export interface WordPressAPIResponse<T> {
  data: T;
  pagination?: {
    totalPosts: number | null;
    totalPages: number | null;
  };
}

// Query Parameters
export interface PostQueryParams {
  page?: number;
  per_page?: number;
  categories?: string;
  search?: string;
  _fields?: string;
  _embed?: boolean;
}

export interface CategoryQueryParams {
  hide_empty?: boolean;
  orderby?: 'name' | 'count' | 'id';
  order?: 'asc' | 'desc';
}

// Error Types
export interface WordPressAPIError {
  code: string;
  message: string;
  data?: any;
}