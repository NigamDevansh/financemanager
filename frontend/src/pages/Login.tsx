import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Handle OAuth2 error redirects from the backend
    useEffect(() => {
        const oauthError = searchParams.get("error");
        if (oauthError === "oauth_failed") {
            setError("Google sign-in failed. Please try again or use email/password.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        //basic validation
        if (!validateEmail(email)) {
            setError("Please enter valid email address");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        //LOGIN API call
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error('Something went wrong', error);
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-background relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div
                className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-400/30 to-fuchsia-400/20 blur-[100px] pointer-events-none"
                style={{ animation: "float 8s ease-in-out infinite" }}
            />
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-pink-400/25 to-rose-400/15 blur-[120px] pointer-events-none"
                style={{ animation: "float-reverse 10s ease-in-out infinite" }}
            />
            <div
                className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-blue-300/20 to-cyan-300/10 blur-[100px] pointer-events-none"
                style={{ animation: "float 12s ease-in-out infinite 2s" }}
            />
            <div
                className="absolute bottom-[10%] left-[15%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-br from-amber-300/15 to-orange-300/10 blur-[80px] pointer-events-none"
                style={{ animation: "float-reverse 9s ease-in-out infinite 1s" }}
            />

            <Header />
            <div className="flex-grow w-full relative flex items-center justify-center p-4">
                <Card className="relative z-10 w-full max-w-md shadow-2xl border-white/40 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold text-center">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center text-sm">
                            Please enter your details to login
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                                label="Email Address"
                                placeholder="name@example.com"
                                type="text"
                            />

                            <Input
                                value={password}
                                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                                label="Password"
                                placeholder="*********"
                                type="password"
                            />

                            {error && (
                                <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded-md border border-destructive/20 font-medium">
                                    {error}
                                </p>
                            )}

                            <Button disabled={isLoading} className="w-full py-5 text-base font-medium mt-2" type="submit">
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></span>
                                        Logging in...
                                    </div>
                                ) : ("LOGIN")}
                            </Button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-2">
                                <div className="flex-1 h-px bg-border" />
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">or</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* Google Sign-In */}
                            <a
                                href={API_ENDPOINTS.GOOGLE_AUTH}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-border bg-white dark:bg-white/5 hover:bg-muted/50 dark:hover:bg-white/10 transition-all duration-200 text-sm font-medium text-foreground shadow-sm hover:shadow-md"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </a>

                            <p className="text-sm text-muted-foreground text-center mt-6">
                                Don't have an account?{" "}
                                <Link to="/signup" className="font-medium text-primary hover:underline transition-all">Signup</Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login;
