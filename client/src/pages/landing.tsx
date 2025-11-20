import { Link } from "wouter";
import { Shield, Lock, BarChart3, Users, CheckCircle2, ArrowRight, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <Badge className="mx-auto" variant="outline" data-testid="badge-fhe-powered">
              <Lock className="w-3 h-3 mr-1" />
              Powered by Fully Homomorphic Encryption
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight" data-testid="heading-main">
                Private Voting for<br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Transparent Democracy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-subtitle">
                VaultVote guarantees absolute ballot secrecy using advanced encryption.
                Your vote remains private forever - even we can't see it.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/explore"
                className="group inline-flex items-center justify-center gap-2 rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                data-testid="button-explore"
              >
                Explore Elections
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                data-testid="button-create"
              >
                <Vote className="w-4 h-4 mr-2" />
                Create Election
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>On-Chain Transparency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Zero Knowledge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-features">
              Why VaultVote?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional voting platforms compromise privacy. VaultVote uses cutting-edge FHE
              to ensure your vote is truly secret.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 hover-elevate" data-testid="card-feature-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Absolute Privacy</CardTitle>
                <CardDescription>
                  Your vote is encrypted before it leaves your device. Not even election
                  organizers can decrypt individual ballots.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover-elevate" data-testid="card-feature-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Homomorphic Counting</CardTitle>
                <CardDescription>
                  Votes are tallied directly on encrypted data. Results are accurate without
                  ever revealing individual choices.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover-elevate" data-testid="card-feature-3">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Blockchain Security</CardTitle>
                <CardDescription>
                  All votes are recorded on-chain with cryptographic proof. Transparent,
                  tamper-proof, and verifiable.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-how-it-works">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              VaultVote uses Fully Homomorphic Encryption to enable private voting
              with public verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="space-y-4" data-testid="step-1">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto">
                1
              </div>
              <h3 className="font-semibold text-xl text-center">Create Election</h3>
              <p className="text-muted-foreground text-center">
                Admin creates an election with title and voting options
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4" data-testid="step-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto">
                2
              </div>
              <h3 className="font-semibold text-xl text-center">Cast Vote</h3>
              <p className="text-muted-foreground text-center">
                Voters encrypt their choice client-side and submit to blockchain
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4" data-testid="step-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto">
                3
              </div>
              <h3 className="font-semibold text-xl text-center">Aggregate</h3>
              <p className="text-muted-foreground text-center">
                Smart contract tallies encrypted votes homomorphically on-chain
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-4" data-testid="step-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto">
                4
              </div>
              <h3 className="font-semibold text-xl text-center">Reveal Results</h3>
              <p className="text-muted-foreground text-center">
                Only aggregate totals are decrypted - individual votes stay secret forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-use-cases">
              Who Uses VaultVote?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "DAOs & Web3",
                description: "Private governance for decentralized organizations"
              },
              {
                icon: Shield,
                title: "Corporations",
                description: "Board elections and shareholder voting"
              },
              {
                icon: Lock,
                title: "Academic Institutions",
                description: "Student government and faculty elections"
              },
              {
                icon: Vote,
                title: "Labor Unions",
                description: "Secret ballot voting for collective decisions"
              },
              {
                icon: BarChart3,
                title: "Research",
                description: "Privacy-preserving polling and surveys"
              },
              {
                icon: Users,
                title: "Communities",
                description: "Fair voting without trust requirements"
              },
            ].map((useCase, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-use-case-${index}`}>
                <CardHeader>
                  <useCase.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold" data-testid="heading-cta">
            Ready to Experience Private Voting?
          </h2>
          <p className="text-xl opacity-90">
            Join the future of democratic decision-making with cryptographically guaranteed privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="group inline-flex items-center justify-center gap-2 rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 px-8"
              data-testid="button-cta-explore"
            >
              Browse Elections
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent border border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 h-11 px-8"
              data-testid="button-cta-create"
            >
              Create Your First Election
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span className="font-semibold">VaultVote</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with Fully Homomorphic Encryption for absolute privacy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
