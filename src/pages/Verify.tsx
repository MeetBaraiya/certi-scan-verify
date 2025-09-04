import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, XCircle, User, GraduationCap, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateInfo {
  name: string;
  rollNo: string;
  certificateId: string;
  issueDate: string;
  course: string;
  grade: string;
}

interface VerificationResult {
  isValid: boolean;
  message: string;
  certificateInfo?: CertificateInfo;
}

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      toast({
        title: "Certificate ID Required",
        description: "Please enter a certificate ID to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification logic
      const isValid = certificateId.toLowerCase().includes("cert") || Math.random() > 0.4;
      
      if (isValid) {
        setVerificationResult({
          isValid: true,
          message: "Certificate found and verified successfully.",
          certificateInfo: {
            name: "Jane Smith",
            rollNo: "CS2021002",
            certificateId: certificateId,
            issueDate: "June 15, 2024",
            course: "Bachelor of Computer Science",
            grade: "A+"
          }
        });
      } else {
        setVerificationResult({
          isValid: false,
          message: "Certificate not found in our database. Please check the ID and try again."
        });
      }
      
      setIsLoading(false);
      
      toast({
        title: isValid ? "Certificate Found" : "Certificate Not Found",
        description: isValid ? "The certificate has been verified." : "No certificate found with this ID.",
        variant: isValid ? "default" : "destructive",
      });
    }, 1500);
  };

  const handleReset = () => {
    setCertificateId("");
    setVerificationResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Verify by Certificate ID</h1>
          <p className="text-muted-foreground">Enter a certificate ID to check its authenticity</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Certificate Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certificate-id">Certificate ID</Label>
              <Input
                id="certificate-id"
                placeholder="Enter certificate ID (e.g., CERT-2024-001)"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleVerify}
                disabled={isLoading || !certificateId.trim()}
                className="flex-1"
                variant="hero"
              >
                {isLoading ? "Checking..." : "Check Certificate"}
              </Button>
              
              {verificationResult && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {verificationResult && (
          <Card className={`shadow-elevated border-2 ${
            verificationResult.isValid 
              ? 'border-success bg-success/5' 
              : 'border-destructive bg-destructive/5'
          }`}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {verificationResult.isValid ? (
                    <CheckCircle className="h-8 w-8 text-success" />
                  ) : (
                    <XCircle className="h-8 w-8 text-destructive" />
                  )}
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      verificationResult.isValid ? 'text-success' : 'text-destructive'
                    }`}>
                      {verificationResult.isValid ? "✅ Certificate Verified" : "❌ Certificate Not Found"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {verificationResult.message}
                    </p>
                  </div>
                </div>

                {verificationResult.certificateInfo && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Certificate Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Student Name</p>
                            <p className="font-medium">{verificationResult.certificateInfo.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Roll Number</p>
                            <p className="font-medium">{verificationResult.certificateInfo.rollNo}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Certificate ID</p>
                          <p className="font-medium">{verificationResult.certificateInfo.certificateId}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Course</p>
                          <p className="font-medium">{verificationResult.certificateInfo.course}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Grade</p>
                          <p className="font-medium">{verificationResult.certificateInfo.grade}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Date</p>
                          <p className="font-medium">{verificationResult.certificateInfo.issueDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Verify;