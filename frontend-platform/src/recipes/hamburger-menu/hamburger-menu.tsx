'use client';

import { useState } from 'react';
import { Button } from '@/recipes/button/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/recipes/sheet/sheet';
import { Menu, Info, HelpCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: 'About Us',
      href: '/about',
      icon: <Info className="h-5 w-5" />,
      description: 'Learn about Wandar',
    },
    {
      title: 'Help & Support',
      href: '/help',
      icon: <HelpCircle className="h-5 w-5" />,
      description: 'Get help with your safari',
    },
    {
      title: 'Contact',
      href: '/contact',
      icon: <Mail className="h-5 w-5" />,
      description: 'Get in touch with us',
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="text-orange-500 mr-4">{item.icon}</div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-orange-600">
                  {item.title}
                </div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
