import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Ruler } from "lucide-react";
import { mobileNavItems, sizingOptions } from "./constants";

interface MobileMenuProps {
  pathname: string;
  logoUrl?: string;
  onPhoneClick?: () => void;
  onEmailClick?: () => void;
}

export function MobileMenu({ pathname, logoUrl, onPhoneClick, onEmailClick }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <Link href="/" className="flex items-center space-x-2 p-4">
          <Image
            src={logoUrl || "/logo.svg"}
            alt="TaaShop Logo"
            width={32}
            height={32}
            className="w-8 h-8"
            priority
          />
          <span className="font-bold text-lg text-foreground">TaaShop</span>
        </Link>

        <div className="flex flex-col gap-1 p-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors flex items-center justify-start gap-2 [&[data-state=open]>svg]:rotate-180",
                  (pathname.startsWith("/ukuran-harga") ||
                    pathname.startsWith("/harga")) &&
                    "bg-accent font-semibold"
                )}
              >
                <Ruler className="h-4 w-4" />
                <span>Ukuran & Harga</span>
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pl-8 pr-2 pb-1">
                  <div className="flex flex-col gap-1">
                    {sizingOptions.map((option) => (
                      <MobileLink
                        key={option.title}
                        href={option.href}
                        text={option.title}
                        isActive={pathname === option.href}
                      />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {mobileNavItems.map((item) => (
            <MobileLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.title}
              isActive={pathname === item.activePath}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 border-t">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            size="sm" 
            onClick={onPhoneClick}
          >
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button 
            variant="outline" 
            className="flex-1" 
            size="sm" 
            onClick={onEmailClick}
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MobileLinkProps {
  href: string;
  icon?: ReactNode;
  text: string;
  isActive?: boolean;
}

const MobileLink = ({ href, icon, text, isActive }: MobileLinkProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors",
      isActive && "bg-accent font-semibold"
    )}
  >
    {icon}
    {text}
  </Link>
);