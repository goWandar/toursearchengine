'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Menu } from 'lucide-react';
import { Button } from '@/recipes/button/button';
import { ModernSearch } from '@/components/modern-search';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/recipes/sheet/sheet';

export function Navbar() {
  const handleDestinationSelect = (destination: string) => {
    // TODO: Add navigation logic or search analytics here
    console.log('Selected destination:', destination);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm ">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/assets/logo.svg"
              alt="Wandar"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="text-2xl font-bold text-gray-900">Wandar</div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 lg:mx-12">
            <ModernSearch
              onDestinationSelect={handleDestinationSelect}
              placeholder="Search destinations"
            />
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Planning Guide Button - Hidden on small screens */}
            <Link href="/planning-guide" className="hidden sm:block">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                <BookOpen className="h-4 w-4 mr-2" />
                Planning Guide
              </Button>
            </Link>

            {/* Sign Up Button - Hidden on small screens */}
            <Button className="hidden sm:flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium">
              Sign Up
            </Button>

            {/* Hamburger Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Search */}
                  <div className="md:hidden">
                    <ModernSearch
                      onDestinationSelect={handleDestinationSelect}
                      placeholder="Search destinations"
                    />
                  </div>

                  {/* Navigation Links */}
                  <Link href="/destinations" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Destinations
                    </Button>
                  </Link>

                  <Link href="/planning-guide" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Planning Guide
                    </Button>
                  </Link>

                  <Link href="/about" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      About
                    </Button>
                  </Link>

                  <Link href="/contact" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Contact
                    </Button>
                  </Link>

                  {/* Mobile Sign Up */}
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium">
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
