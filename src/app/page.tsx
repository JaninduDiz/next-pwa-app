import Image from 'next/image';
import { CheckCircle, Download, Image as ImageIcon, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PushNotificationManager } from '@/components/push-notification-manager';

export default function Home() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'Service Worker Ready',
      description: 'A service worker is registered to handle network requests, enabling offline capabilities and caching.',
    },
    {
      icon: <WifiOff className="h-8 w-8 text-primary" />,
      title: 'Offline Browsing',
      description: 'Key pages are cached, allowing you to access the app even without an internet connection. Try turning off your Wi-Fi!',
    },
    {
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
      title: 'Image Caching',
      description: 'Images and other static assets are cached to improve loading speed and ensure they are available offline.',
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: 'Installable',
      description: 'Add this app to your home screen for a native-like experience. Look for the install button in the header!',
    },
  ];

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Welcome to NextPWA Learner
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
          This is a demonstration of a Progressive Web App (PWA) built with Next.js. Explore the features below to see what makes a PWA powerful.
        </p>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Push Notifications Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <PushNotificationManager />
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="overflow-hidden">
              <CardHeader>
                  <CardTitle>Cached Content Demo</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="mb-4 text-muted-foreground">This image is served by the service worker and will be available offline after your first visit.</p>
                  <div className="aspect-video relative rounded-lg overflow-hidden border shadow-sm">
                    <Image
                      src="https://picsum.photos/1200/600"
                      alt="A random landscape image"
                      fill
                      className="object-cover"
                      data-ai-hint="landscape photo"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
              </CardContent>
          </Card>
      </section>
    </>
  );
}
