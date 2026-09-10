export interface Article {
  id: number;
  slug: string;
  url: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor: string;
  image: string;
  readTime: string;
  views: number;
  publishedAt: string;
}

export interface ArticlesResponse {
  data: Article[];
  next_page_url: string | null;
}
