import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Book, Loader2, ShieldAlert, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverLocked, setServerLocked] = useState(false);
  const [lockoutMinutes, setLockoutMinutes] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/abdullah");
    }
  }, [user, navigate]);

  // Countdown timer for server lockout
  useEffect(() => {
    if (serverLocked && lockoutMinutes > 0) {
      const timer = setInterval(() => {
        setLockoutMinutes((prev) => {
          if (prev <= 1) {
            setServerLocked(false);
            setRemainingAttempts(5);
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute
      return () => clearInterval(timer);
    }
  }, [serverLocked, lockoutMinutes]);

  const handleSubmit = async () => {
    // Check if locked out
    if (serverLocked) {
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${lockoutMinutes} minute${lockoutMinutes !== 1 ? "s" : ""} before trying again.`,
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
      // Call the rate-limited auth edge function
      const { data, error } = await supabase.functions.invoke("rate-limited-auth", {
        body: { email, password, action: "signin" },
      });

      if (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Check for rate limit lockout
      if (data.locked) {
        setServerLocked(true);
        setLockoutMinutes(data.remainingMinutes || 15);
        setRemainingAttempts(0);
        
        toast({
          title: "Too Many Attempts",
          description: data.message || `Please wait ${data.remainingMinutes} minutes.`,
          variant: "destructive",
        });
        return;
      }

      // Check for auth error
      if (data.error) {
        setRemainingAttempts(data.remainingAttempts ?? remainingAttempts - 1);
        
        let message = data.error;
        if (message.includes("Invalid login credentials")) {
          message = `Invalid email or password. ${data.remainingAttempts ?? remainingAttempts - 1} attempts remaining.`;
        }
        
        toast({
          title: "Login Failed",
          description: message,
          variant: "destructive",
        });
        return;
      }

      // Successful login - set session
      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        
        setRemainingAttempts(5);
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
      }
    } catch (error) {
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
          {serverLocked && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription>
                Too many failed attempts from your IP. Please wait {lockoutMinutes} minute{lockoutMinutes !== 1 ? "s" : ""} before trying again.
              </AlertDescription>
            </Alert>
          )}
          
          {!serverLocked && remainingAttempts < 5 && remainingAttempts > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {remainingAttempts} login {remainingAttempts === 1 ? "attempt" : "attempts"} remaining before temporary lockout.
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
              disabled={isSubmitting || serverLocked}
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
              disabled={isSubmitting || serverLocked}
              onKeyDown={(e) => e.key === "Enter" && !serverLocked && handleSubmit()}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isSubmitting || serverLocked}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : serverLocked ? (
              <>
                <ShieldAlert className="mr-2 h-4 w-4" />
                Locked ({lockoutMinutes}m)
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
