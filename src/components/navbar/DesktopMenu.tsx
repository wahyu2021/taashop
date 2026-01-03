import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";
import { sizingOptions } from "./constants";

interface DesktopMenuProps {
  pathname: string;
}

export function DesktopMenu({ pathname }: DesktopMenuProps) {
  return (
    <div className="hidden md:flex flex-1 justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center [&>li>a]:flex [&>li>a]:items-center [&>li>button]:flex [&>li>button]:items-center">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                  "hover:bg-white/15 hover:text-white",
                  pathname === "/" && "bg-white/20 text-white font-semibold"
                )}
              >
                Beranda
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/galeri"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                  "hover:bg-white/15 hover:text-white",
                  pathname === "/galeri" && "bg-white/20 text-white font-semibold"
                )}
              >
                Galeri
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent! text-white/90! dark:text-slate-200! px-3 transition-all",
                "hover:bg-white/15! hover:text-white!",
                "data-[state=open]:bg-white/20! data-[state=open]:text-white!",
                pathname.startsWith("/ukuran-harga") &&
                  "bg-white/20 text-white font-semibold"
              )}
            >
              Ukuran & Harga
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white dark:bg-slate-900 backdrop-blur-md border border-orange-200 dark:border-slate-700 shadow-xl rounded-lg">
              <ul className="grid gap-3 p-6 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                {sizingOptions.map((option) => (
                  <ListItem
                    key={option.title}
                    title={option.title}
                    href={option.href}
                  >
                    {option.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/tentang-kami"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                  "hover:bg-white/15 hover:text-white",
                  pathname === "/tentang-kami" &&
                    "bg-white/20 text-white font-semibold"
                )}
              >
                Tentang Kami
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/faq"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                  "hover:bg-white/15 hover:text-white",
                  pathname === "/faq" && "bg-white/20 text-white font-semibold"
                )}
              >
                FAQ
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/kontak"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                  "hover:bg-white/15 hover:text-white",
                  pathname === "/kontak" && "bg-white/20 text-white font-semibold"
                )}
              >
                Hubungi Kami
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}