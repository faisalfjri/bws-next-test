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

export interface MenuItem {
  id: number;
  parent: number;
  url: string;
  target: string | null;
  judul: string;
  slug: string;
  publish: boolean | number;
  ordering?: number;
  children_recursive: MenuItem[];
}

export interface Slideshow {
  id: number;
  judul: string;
  deskripsi?: string;
  image: string;
  image_caption?: string;
  link?: string;
  url?: string;
  publish: boolean | number;
}

export interface WebsiteArticle {
  id: number;
  slug: string;
  judul: string;
  image: string;
  language?: string;
  published?: number;
  created_at: string;
  kategori_id?: number;
  metadesc?: string;
  categories?: { id: number; name: string; alias?: string };
}

export interface Pengumuman {
  id: number;
  slug: string;
  judul: string;
  language?: string;
  published?: number;
  created_at: string;
  kategori_id?: number;
}

export interface ProductItem {
  id: number;
  nama: string;
  image: string;
  category_id: number;
  featured?: boolean | number;
  slug?: string;
}

export interface Paginated<T> {
  current_page: number;
  data: T[];
  per_page?: number;
  total?: number;
  next_page_url?: string | null;
}

export interface WebsiteResponse {
  articles: Paginated<WebsiteArticle>;
  slideshows: Slideshow[];
  menus: MenuItem[];
  pengumumans: Paginated<Pengumuman>;
  visitorCount: number;
  counts: Record<string, number>;
  totalVotes: number;
  alreadyVoted?: boolean;
  dataPeta: ProductItem[];
  dataInfografis: ProductItem[];
  dataPejabat: ProductItem[];
}

export interface WebsitePageDetail {
  id: number;
  slug: string;
  judul?: string;
  title?: string;
  nama?: string;
  isi?: string;
  content?: string;
  deskripsi?: string;
  image?: string;
  image_caption?: string;
  iframe?: string;
  metadesc?: string;
  created_at?: string;
  updated_at?: string;
  categories?: { id: number; name: string; alias?: string };
  parents?: WebsitePageDetail | null;
}

export interface WebsitePageResponse {
  category?: unknown[];
  articles?: Paginated<WebsiteArticle>;
  article?: WebsitePageDetail | null;
  menus?: MenuItem[];
}

export interface WebsiteArticleDetail {
  id: number;
  judul: string;
  slug: string;
  kategori_id: number;
  isi: string;
  published: number;
  created_at: string;
  created_by?: number;
  updated_at?: string;
  updated_by?: number;
  publish_up?: string;
  image: string;
  image_caption?: string;
  language?: string;
  categories?: { id: number; name: string; alias?: string };
}

export interface WebsiteArticleDetailResponse {
  category?: { id: number; name: string; alias: string }[];
  articles?: Paginated<WebsiteArticle>;
  article?: WebsiteArticleDetail | null;
  menus?: MenuItem[];
}

export interface WebsiteCategoryResponse {
  title?: string;
  articles?: Paginated<WebsiteArticle>;
  menus?: MenuItem[];
  search?: string;
}

export type CmsContent =
  | { kind: "page"; detail: WebsitePageDetail; menus: MenuItem[]; latest: WebsiteArticle[] }
  | { kind: "product"; detail: WebsitePageDetail }
  | { kind: "article"; detail: WebsitePageDetail }
  | { kind: "category"; title: string; articles: WebsiteArticle[]; menus: MenuItem[] }
  | null;
