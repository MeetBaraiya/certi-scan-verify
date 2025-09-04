import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Upload, Database, Users, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentRecord {
  id: number;
  name: string;
  rollNo: string;
  certificateId: string;
  course: string;
  issueDate: string;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "password") {
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleProcessCSV = () => {
    if (!selectedFile) return;

    setIsLoading(true);
    
    // Simulate CSV processing
    setTimeout(() => {
      const mockData: StudentRecord[] = [
        {
          id: 1,
          name: "Alice Johnson",
          rollNo: "CS2021001",
          certificateId: "CERT-2024-001",
          course: "Computer Science",
          issueDate: "2024-06-15"
        },
        {
          id: 2,
          name: "Bob Smith",
          rollNo: "CS2021002", 
          certificateId: "CERT-2024-002",
          course: "Computer Science",
          issueDate: "2024-06-15"
        },
        {
          id: 3,
          name: "Carol Davis",
          rollNo: "EE2021001",
          certificateId: "CERT-2024-003",
          course: "Electrical Engineering",
          issueDate: "2024-06-15"
        },
        {
          id: 4,
          name: "David Wilson",
          rollNo: "ME2021001",
          certificateId: "CERT-2024-004",
          course: "Mechanical Engineering",
          issueDate: "2024-06-15"
        }
      ];
      
      setStudentRecords(mockData);
      setIsLoading(false);
      
      toast({
        title: "CSV Processed",
        description: `Successfully loaded ${mockData.length} student records.`,
      });
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: "", password: "" });
    setStudentRecords([]);
    setSelectedFile(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-elevated">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <p className="text-muted-foreground">Access the administrative dashboard</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full"
                variant="hero"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <div className="text-center text-xs text-muted-foreground">
                Demo credentials: admin / password
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage student records and certificates</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{studentRecords.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{studentRecords.length}</p>
                <p className="text-sm text-muted-foreground">Valid Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">CSV</p>
                <p className="text-sm text-muted-foreground">Import Format</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Student Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <div className="text-center space-y-2">
                <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload CSV file
                </p>
                <p className="text-xs text-muted-foreground">
                  Format: Name, Roll No, Certificate ID, Course, Issue Date
                </p>
              </div>
            </label>
          </div>
          
          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <Button
                onClick={handleProcessCSV}
                disabled={isLoading}
                variant="hero"
              >
                {isLoading ? "Processing..." : "Process CSV"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {studentRecords.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Student Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Issue Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.rollNo}</TableCell>
                      <TableCell>{record.certificateId}</TableCell>
                      <TableCell>{record.course}</TableCell>
                      <TableCell>{record.issueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Admin;