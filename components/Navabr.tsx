"use client";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
];
const Navabr = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const firstName =
    user?.firstName || user?.fullName?.split(" ")[0] || "Account";

  return (
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-height py-4 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-0.5">
          <Image
            src="/assets/logo.png"
            alt="Bookified "
            width={40}
            height={40}
          />
          <span className="logo-text"> Bookified</span>
        </Link>
        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base",
                  isActive && "nav-link-active",
                  "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton>
              <button className="nav-btn" type="button">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button
                className="btn-primary h-10 px-4 py-2 text-base"
                type="button"
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
            <Link
              href="/subscription"
              className="hidden lg:inline-flex text-base font-medium text-black hover:opacity-70 transition-opacity"
            >
              {firstName}
            </Link>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Navabr;
