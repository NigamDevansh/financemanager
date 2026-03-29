import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";

const OAuth2Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);
    const [status, setStatus] = useState<"loading" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const provider = searchParams.get("provider");

        if (error) {
            // Handle specific error types from the backend
            if (error === "provider_conflict" && provider) {
                setErrorMessage(
                    `This email is already registered with ${provider === "LOCAL" ? "email & password" : provider}. Please use that method to log in.`
                );
            } else if (error === "oauth_failed") {
                setErrorMessage("Google sign-in failed. Please try again.");
            } else {
                setErrorMessage("Something went wrong during sign-in. Please try again.");
            }
            setStatus("error");
            return;
        }

        if (code) {
            const exchangeCode = async () => {
                try {
                    // POST the one-time code to get the real JWT
                    const response = await axiosConfig.post(API_ENDPOINTS.OAUTH2_EXCHANGE, { code });
                    const { token, user } = response.data;

                    localStorage.setItem("token", token);
                    setUser(user);
                    toast.success("Signed in with Google successfully!");
                    navigate("/dashboard", { replace: true });
                } catch (err) {
                    console.error("Failed to exchange OAuth2 code:", err);
                    setErrorMessage("Sign-in code expired or already used. Please try again.");
                    setStatus("error");
                }
            };

            exchangeCode();
        } else {
            setErrorMessage("No authentication data received. Please try again.");
            setStatus("error");
        }
    }, [searchParams, navigate, setUser]);

    if (status === "error") {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
                {/* Animated gradient orbs */}
                <div
                    className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-400/30 to-fuchsia-400/20 blur-[100px] pointer-events-none"
                    style={{ animation: "float 8s ease-in-out infinite" }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-pink-400/25 to-rose-400/15 blur-[120px] pointer-events-none"
                    style={{ animation: "float-reverse 10s ease-in-out infinite" }}
                />

                <div className="relative z-10 bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
                    {/* Error icon */}
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-destructive/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold text-foreground mb-2">Sign-in Failed</h2>
                    <p className="text-muted-foreground text-sm mb-6">{errorMessage}</p>

                    <button
                        onClick={() => navigate("/login", { replace: true })}
                        className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    // Loading state
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div
                className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-400/30 to-fuchsia-400/20 blur-[100px] pointer-events-none"
                style={{ animation: "float 8s ease-in-out infinite" }}
            />
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-pink-400/25 to-rose-400/15 blur-[120px] pointer-events-none"
                style={{ animation: "float-reverse 10s ease-in-out infinite" }}
            />

            <div className="relative z-10 bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
                {/* Spinner */}
                <div className="w-12 h-12 mx-auto mb-5 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />

                <h2 className="text-xl font-semibold text-foreground mb-2">Signing you in...</h2>
                <p className="text-muted-foreground text-sm">Please wait while we complete your Google sign-in.</p>
            </div>
        </div>
    );
};

export default OAuth2Callback;
