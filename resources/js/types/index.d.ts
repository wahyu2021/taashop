// ─── Auth ───────────────────────────────────────────────

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

// ─── Settings ───────────────────────────────────────────

export interface SettingData {
    id: number | null;
    key: string;
    value: string | null;
    label: string;
    type: string;
    group: string;
    order_priority: number;
    image_url?: string | null;
}

// ─── Category ───────────────────────────────────────────

export interface CategoryData {
    id: number | null;
    name: string;
    slug: string;
    type: string;
}

// ─── Product ────────────────────────────────────────────

export interface ProductData {
    id: number | null;
    title: string;
    slug: string;
    description: string | null;
    is_featured: boolean;
    order_priority: number;
    status: string;
    category: CategoryData | null;
    image_url: string | null;
}

// ─── Material ───────────────────────────────────────────

export interface MaterialData {
    id: number | null;
    name: string;
    slug: string;
    summary: string | null;
    description: string | null;
    order_priority: number;
    status: string;
    features: string[];
    image_url: string | null;
}

// ─── Package ────────────────────────────────────────────

export interface PackageData {
    id: number | null;
    title: string;
    slug: string;
    product_type: string;
    includes: string | null;
    print_type: string | null;
    min_price: number;
    max_price: number;
    order_priority: number;
    status: string;
    image_url: string | null;
}

// ─── Portfolio ──────────────────────────────────────────

export interface PortfolioData {
    id: number | null;
    title: string;
    slug: string;
    client_name: string | null;
    description: string | null;
    project_date: string | null;
    order_priority: number;
    status: string;
    category: CategoryData | null;
    image_url: string | null;
}

// ─── News ───────────────────────────────────────────────

export interface NewsData {
    id: number | null;
    title: string;
    slug: string;
    summary: string | null;
    content: string | null;
    status: string;
    published_at: string | null;
    order_priority: number;
    image_url: string | null;
}

// ─── Contact Submission ─────────────────────────────────

export interface ContactSubmissionData {
    id: number | null;
    name: string;
    email: string | null;
    phone: string | null;
    subject: string | null;
    message: string | null;
    status: string;
    source_page: string | null;
    submitted_at: string;
}

// ─── Dashboard ──────────────────────────────────────────

export interface DashboardStatsData {
    total_products: number;
    total_materials: number;
    total_packages: number;
    new_messages: number;
}

// ─── Inertia Page Props ─────────────────────────────────

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
