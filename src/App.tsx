import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./i18n/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CallDemo from "./pages/CallDemo";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

const GlobalErrorGuards = () => {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      // Prevent dev overlay / hard crash behavior in some environments
      event.preventDefault();
      toast.error("Something went wrong. Please try again.");
    };

    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error || event.message);
    };

    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
};

const GSAPParallaxProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Parallax hero background
    const heroParallax = document.querySelector('.hero-parallax');
    if (heroParallax) {
      gsap.to('.hero-parallax', {
        y: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-parallax',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Parallax 3D background
    const auraBackground = document.querySelector('.aura-background-component');
    if (auraBackground) {
      gsap.to('.aura-background-component', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Parallax on glass panels
    gsap.utils.toArray<HTMLElement>('.glass-panel').forEach((panel, i) => {
      const speed = (i % 2 === 0) ? 50 : -50;
      gsap.to(panel, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <GSAPParallaxProvider>
          <TooltipProvider>
            <GlobalErrorGuards />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calldemo" element={<CallDemo />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </GSAPParallaxProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;