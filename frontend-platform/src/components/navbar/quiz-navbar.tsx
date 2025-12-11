'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HamburgerMenu } from '@/recipes/hamburger-menu/hamburger-menu';
import { ReactNode } from 'react';

interface QuizNavbarProps {
  children?: ReactNode;
}

export function QuizNavbar({ children }: QuizNavbarProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm">
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

          {/* Right Navigation - Custom children or default Hamburger Menu */}
          <div className="flex items-center">
            {children || <HamburgerMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}
