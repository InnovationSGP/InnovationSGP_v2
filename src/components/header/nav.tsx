"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { navItems } from "./nav-items";
import { ChevronDown, ArrowRight } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {navItems?.map((item, index) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`group flex items-center gap-1.5 font-semibold text-[15px] transition-all duration-300 px-4 py-2 rounded-lg ${
                  isActive 
                    ? "text-brand-primary bg-brand-primary/5 border border-brand-primary/10" 
                    : "text-gray-700 hover:text-brand-primary hover:bg-brand-primary/5"
                }`}
              >
                {item.label}

                {item?.subMenu && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${
                      hoveredItem === index ? "rotate-180" : ""
                    } ${isActive ? "text-brand-primary" : "text-gray-500"}`}
                  />
                )}
              </Link>

              {/* Modern White-First Mega Menu Dropdown */}
              {item.subMenu && hoveredItem === index && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-gray-900/10 overflow-hidden border border-gray-200/60 min-w-[520px] backdrop-blur-xl">
                    {/* Hero Section */}
                    <div className="relative h-32 bg-gradient-to-br from-brand-primary to-brand-primary-lighter overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 to-brand-primary-teal/90"></div>
                      <div className="relative p-6 h-full flex flex-col justify-end">
                        <h3 className="text-white text-lg font-bold mb-1">{item.label}</h3>
                        <p className="text-brand-teal-100 text-sm font-medium">{item.description}</p>
                      </div>
                      {/* Brand decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-brand-teal-400/20 rounded-full blur-sm"></div>
                      <div className="absolute bottom-4 right-8 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
                      <div className="absolute top-8 right-12 w-3 h-3 bg-brand-accent-teal/40 rounded-full"></div>
                    </div>
                    
                    {/* Menu Items Grid */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-3">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem?.href}
                            className="group p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200/60 hover:shadow-sm"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-2xl">{subItem.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-brand-primary transition-colors">
                                    {subItem?.label}
                                  </h4>
                                  <ArrowRight 
                                    size={14} 
                                    className="text-gray-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100"
                                  />
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  {subItem.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      
                      {/* View All Link */}
                      <div className="mt-6 pt-4 border-t border-gray-200/60">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-light font-semibold text-sm group transition-colors"
                        >
                          View All {item.label}
                          <ArrowRight 
                            size={14} 
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
