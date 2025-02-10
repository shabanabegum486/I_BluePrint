"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogIn, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);



  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={150}
            height={80}
            alt="Blue Print Logo"
            className="object-contain"
          />
        </div>

        
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

