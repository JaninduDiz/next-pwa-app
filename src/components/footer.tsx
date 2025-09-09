export function Footer() {
    return (
      <footer className="bg-secondary text-secondary-foreground mt-auto">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} NextPWA Learner. All rights reserved.</p>
        </div>
      </footer>
    );
  }
