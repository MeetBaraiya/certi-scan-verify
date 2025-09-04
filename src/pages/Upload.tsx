import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload as UploadIcon, FileText, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExtractedData {
  name: string;
  rollNo: string;
  certificateId: string;
}

interface VerificationResult {
  isValid: boolean;
  message: string;
  data?: ExtractedData;
}

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setSelectedFile(file);
        setExtractedData(null);
        setVerificationResult(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF or image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    
    // Simulate OCR extraction and verification
    setTimeout(() => {
      // Mock extracted data
      const mockData: ExtractedData = {
        name: "John Doe",
        rollNo: "CS2021001",
        certificateId: "CERT-2024-001"
      };
      
      setExtractedData(mockData);
      
      // Mock verification result (random for demo)
      const isValid = Math.random() > 0.3; // 70% chance of being valid
      setVerificationResult({
        isValid,
        message: isValid 
          ? "Certificate verified successfully. This is a genuine certificate."
          : "Invalid certificate. This certificate could not be verified in our database.",
        data: mockData
      });
      
      setIsLoading(false);
      
      toast({
        title: isValid ? "Certificate Valid" : "Certificate Invalid",
        description: isValid ? "The certificate has been verified." : "The certificate could not be verified.",
        variant: isValid ? "default" : "destructive",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Upload Certificate</h1>
          <p className="text-muted-foreground">Upload a certificate to verify its authenticity</p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadIcon className="h-5 w-5" />
              Upload Certificate File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="hidden"
                id="certificate-upload"
              />
              <label htmlFor="certificate-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF or image files only
                  </p>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                </div>
                <Button
                  onClick={handleVerify}
                  disabled={isLoading}
                  variant="hero"
                >
                  {isLoading ? "Verifying..." : "Verify Certificate"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {extractedData && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Extracted Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{extractedData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
                  <p className="font-medium">{extractedData.rollNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Certificate ID</label>
                  <p className="font-medium">{extractedData.certificateId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {verificationResult && (
          <Card className={`shadow-card border-2 ${
            verificationResult.isValid 
              ? 'border-success bg-success/5' 
              : 'border-destructive bg-destructive/5'
          }`}>
            <CardContent className="pt-6">
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
                    {verificationResult.isValid ? "✅ Valid Certificate" : "❌ Invalid Certificate"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {verificationResult.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;