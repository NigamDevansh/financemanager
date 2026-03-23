import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        //basic validation
        if (!fullName.trim()) {
            setError("Please enter your fullname");
            setIsLoading(false);
            return;
        }

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

        //signup api call
        try {

            //upload image if present
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            })
            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch (err: any) {
            console.error('Something went wrong', err);
            setError(err.message);
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
                <Card className="relative z-10 w-full max-w-lg shadow-2xl border-white/40 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-xl overflow-hidden my-4">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold text-center">
                            Create An Account
                        </CardTitle>
                        <CardDescription className="text-center text-sm">
                            Start tracking your spendings by joining with us.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="max-h-[75vh] overflow-y-auto px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName((e.target as HTMLInputElement).value)}
                                    label="Full Name"
                                    placeholder="Jhon Doe"
                                    type="text"
                                />

                                <Input
                                    value={email}
                                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                                    label="Email Address"
                                    placeholder="name@example.com"
                                    type="text"
                                />

                                <div className="col-span-2">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                                        label="Password"
                                        placeholder="*********"
                                        type="password"
                                    />
                                </div>

                            </div>
                            {error && (
                                <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded-md border border-destructive/20 font-medium">
                                    {error}
                                </p>
                            )}

                            <Button disabled={isLoading} className="w-full py-5 text-base font-medium mt-2" type="submit">
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></span>
                                        Signing Up...
                                    </div>
                                ) : (
                                    "SIGN UP"
                                )}
                            </Button>

                            <p className="text-sm text-muted-foreground text-center mt-6">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-primary hover:underline transition-all">Login</Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Signup;
