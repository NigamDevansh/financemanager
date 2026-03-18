import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
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
        <div className="min-h-screen w-full flex flex-col bg-background">
            <Header />
            <div className="flex-grow w-full relative flex items-center justify-center p-4">
                {/* Background image with blur*/}
                <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-[4px] opacity-40 mix-blend-multiply" />

                <Card className="relative z-10 w-full max-w-lg shadow-2xl border-border bg-card/95 backdrop-blur-[2px] overflow-hidden my-4">
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
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5 mr-2" />
                                        Signing Up...
                                    </>
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
