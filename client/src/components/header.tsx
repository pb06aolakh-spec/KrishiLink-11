import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Tractor, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Browse Equipment", path: "/browse" },
    { label: "List Equipment", path: "/list" },
    { label: "About", path: "/about" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={() => mobile && setOpen(false)}
        >
          <Button
            variant="ghost"
            className={`${
              location === item.path ? "bg-accent" : ""
            } ${mobile ? "w-full justify-start" : ""}`}
            data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover-elevate px-2 py-1 rounded-md" data-testid="link-home">
            <Tractor className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KrishiLink</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
