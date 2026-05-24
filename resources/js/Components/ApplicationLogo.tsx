import { SVGAttributes } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function ApplicationLogo({ className, ...props }: SVGAttributes<HTMLImageElement>) {
    const { site_settings } = usePage<PageProps>().props;
    
    return (
        <img 
            src={site_settings?.site_logo || '/images/logo.svg'} 
            alt="Logo" 
            className={className}
            {...props as any}
        />
    );
}
