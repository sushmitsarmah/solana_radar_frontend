// components/Navigation.tsx
'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from 'next/image'

import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/create-bet",
    label: "Create a Bet",
  },
  {
    href: "/place-stake",
    label: "Place a Stake",
  },
  {
    href: "/resolve-bet",
    label: "Resolve a Bet",
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex justify-between items-center py-4">
      <Link href="/" className="text-2xl font-bold flex flex-row gap-2 items-center">
        <Image src="/logo.png" alt="PalStakes" width={50} height={50}/>
        PalStakes
      </Link>
      <nav className="hidden md:flex gap-6 items-center">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-md font-medium transition-colors hover:text-primary",
              pathname === route.href
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
        <WalletMultiButton />
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
            <WalletMultiButton />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}