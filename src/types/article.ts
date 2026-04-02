// src/types/article.ts

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content from Tiptap
  excerpt: string | null;
  cover_image_url: string | null;
  category: ArticleCategory;
  is_published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
}

// Union type for stricter typing on categories (extensible)
export type ArticleCategory = 
  | 'general' 
  | 'academic' 
  | 'news' 
  | 'guidance' 
  | string;

// Interface for the Create/Update form
export interface ArticleFormData {
  title: string;
  slug: string; // Generated on client side or server
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  category: ArticleCategory;
  is_published: boolean;
}

// Utility type for the Table/Grid view (lighter payload)
export type ArticleSummary = Pick<
  Article, 
  'id' | 'title' | 'slug' | 'excerpt' | 'cover_image_url' | 'category' | 'is_published' | 'created_at'
>;