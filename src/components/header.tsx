import Image from 'next/image';
import Link from 'next/link';
import { InstallPromptButton } from './install-prompt-button';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="NextPWA Learner Logo" width={32} height={32} className="invert" />
            <span className="text-xl font-bold">NextPWA Learner</span>
          </Link>
          <div className="flex items-center">
            <InstallPromptButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
