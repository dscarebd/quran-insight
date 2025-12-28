import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRateLimit } from "@/hooks/useRateLimit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Book, Loader2, ShieldAlert, AlertTriangle } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    isLocked,
    attemptsRemaining,
    formatRemainingTime,
    recordAttempt,
    resetAttempts,
  } = useRateLimit();

  useEffect(() => {
    if (user) {
      navigate("/abdullah");
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    // Check if locked out
    if (isLocked) {
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${formatRemainingTime()} before trying again.`,
        variant: "destructive",
      });
      return;
    }

    // Validate inputs
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);

      if (error) {
        // Record failed attempt
        recordAttempt();
        
        let message = error.message;
        if (message.includes("Invalid login credentials")) {
          message = `Invalid email or password. ${attemptsRemaining - 1} attempts remaining.`;
        }
        
        toast({
          title: "Login Failed",
          description: message,
          variant: "destructive",
        });
      } else {
        // Successful login - reset attempts
        resetAttempts();
      }
    } catch (error) {
      recordAttempt();
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background islamic-pattern p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Book className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            Sign in to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLocked && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription>
                Too many failed attempts. Please wait {formatRemainingTime()} before trying again.
              </AlertDescription>
            </Alert>
          )}
          
          {!isLocked && attemptsRemaining < 5 && attemptsRemaining > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {attemptsRemaining} login {attemptsRemaining === 1 ? "attempt" : "attempts"} remaining before temporary lockout.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isLocked}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting || isLocked}
              onKeyDown={(e) => e.key === "Enter" && !isLocked && handleSubmit()}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isSubmitting || isLocked}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : isLocked ? (
              <>
                <ShieldAlert className="mr-2 h-4 w-4" />
                Locked ({formatRemainingTime()})
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          
          <div className="text-center">
            <Button variant="link" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
