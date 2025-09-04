import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, Search, FileCheck, Database, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-full shadow-elevated">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Authenticity Validator for Academia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Secure, reliable certificate verification system for educational institutions. 
            Verify academic credentials instantly with advanced document authentication.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="shadow-elevated hover:shadow-elevated hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Upload Certificate</CardTitle>
              <p className="text-muted-foreground">
                Upload your certificate file (PDF or image) for instant verification
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="hero" size="lg" className="w-full">
                <Link to="/upload">
                  <Upload className="h-5 w-5" />
                  Upload & Verify
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-elevated hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Search className="h-8 w-8 text-accent" />
                </div>
              </div>
              <CardTitle className="text-2xl">Verify by ID</CardTitle>
              <p className="text-muted-foreground">
                Enter a certificate ID to quickly check its authenticity
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="/verify">
                  <Search className="h-5 w-5" />
                  Verify by ID
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card text-center">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-4">
                  <FileCheck className="h-12 w-12 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Verification</h3>
                <p className="text-muted-foreground">
                  Get immediate results with our advanced OCR and database matching technology
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-4">
                  <Database className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comprehensive Database</h3>
                <p className="text-muted-foreground">
                  Access to extensive academic records from multiple institutions and programs
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-4">
                  <Lock className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Bank-level security with encrypted data handling and audit trails
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Admin Access */}
        <div className="max-w-md mx-auto mt-16">
          <Card className="shadow-card border-2 border-muted">
            <CardContent className="pt-6 text-center">
              <Lock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Administrative Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Institutional administrators can manage student records
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin">
                  Admin Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;