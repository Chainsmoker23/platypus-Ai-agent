import React from 'react';
import { ICONS } from '../constants';
import AnimatedPlatypus from './AnimatedPlatypus';

const Footer: React.FC = () => {
  return (
    <footer className="bg-platypus-secondary">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex items-center gap-4">
             <AnimatedPlatypus mascotType="wavingSimple" className="w-24 h-24 hidden lg:block animate-fade-in-up opacity-0" />
            <div>
              <h3 className="text-xl font-bold">Stay Updated</h3>
              <p className="mt-2 text-platypus-subtle">Get the latest news and updates about Platypus.</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <form className="mt-4 flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-platypus-accent bg-white"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-platypus-accent text-white font-semibold rounded-r-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="text-center md:text-right">
             <h3 className="text-xl font-bold">Follow Us</h3>
             <div className="flex justify-center md:justify-end space-x-4 mt-4 text-platypus-subtle">
                <a href="#" className="hover:text-platypus-primary">{ICONS.twitter}</a>
                <a href="#" className="hover:text-platypus-primary">{ICONS.github}</a>
             </div>
          </div>
        </div>
        <div className="mt-12 border-t border-platypus-subtle/20 pt-8 text-center text-platypus-subtle">
          <p>&copy; {new Date().getFullYear()} Platypus AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;