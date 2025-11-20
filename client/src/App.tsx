import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Lock, Vote, PlusCircle, LayoutGrid, Home } from "lucide-react";

import Landing from "@/pages/landing";
import Explore from "@/pages/explore";
import MyElections from "@/pages/my-elections";
import CreateElection from "@/pages/create";
import NotFound from "@/pages/not-found";

function Navigation() {
  const [location] = useLocation();

  // Don't show navigation on landing page
  if (location === "/") {
    return null;
  }

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: Vote },
    { path: "/my-elections", label: "My Elections", icon: LayoutGrid },
    { path: "/create", label: "Create", icon: PlusCircle },
  ];

  return (
    <nav className="border-b border-yellow-200/50 dark:border-yellow-500/20 bg-gradient-to-r from-background via-yellow-50/30 to-background dark:from-background dark:via-yellow-950/20 dark:to-background sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity group"
            data-testid="link-home"
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 shadow-md group-hover:shadow-lg transition-shadow">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 dark:from-yellow-400 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              VaultVote
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-2">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 h-9 px-4 py-2 ${
                    isActive 
                      ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-white shadow-md hover:shadow-lg hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-700' 
                      : 'text-foreground hover:bg-yellow-100 hover:text-yellow-900 dark:hover:bg-yellow-950/30 dark:hover:text-yellow-400'
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/explore" component={Explore} />
        <Route path="/my-elections" component={MyElections} />
        <Route path="/create" component={CreateElection} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
