export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
