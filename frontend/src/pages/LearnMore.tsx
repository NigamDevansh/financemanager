import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle2 } from "lucide-react";

const LearnMore = () => {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-background text-foreground flex flex-col relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-violet-300/20 blur-[100px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-violet-900/20" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-300/20 blur-[120px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-teal-900/20" />
            
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-20 relative z-10 flex flex-col items-center">
                <div className="max-w-3xl w-full text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-teal-500 pb-4">
                        Discover the Features
                    </h1>
                    <p className="text-xl text-muted-foreground mt-4 leading-relaxed font-medium">
                        Finance Manager App combines beautiful aesthetics with practical utilities to give you full control over your wealth tracking.
                    </p>
                </div>

                <div className="w-full max-w-4xl bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl p-8 md:p-12 mb-16">
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <CheckCircle2 className="w-6 h-6 text-violet-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Automated Income & Expense Tracking</h3>
                                <p className="text-muted-foreground">Easily log your transactions. Our system automatically categorizes your spending so you know exactly where your money goes every month.</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <CheckCircle2 className="w-6 h-6 text-teal-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Stunning Financial Overviews</h3>
                                <p className="text-muted-foreground">Say goodbye to boring charts. Utilize dynamic pie charts and rich metric cards powered by Recharts to view your financial distributions instantly.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="mt-1">
                                <CheckCircle2 className="w-6 h-6 text-fuchsia-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Premium Glassmorphic Design</h3>
                                <p className="text-muted-foreground">Built meticulously using `shadcn/ui` and a customized pastel aesthetic to provide an interface that feels like a multi-million-dollar SaaS application.</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                                <p className="text-muted-foreground">Your financial data relies on robust JWT authentication, ensuring your budget remains solely your business.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button size="lg" className="h-14 px-10 bg-gradient-to-r from-violet-600 to-teal-500 text-white rounded-xl shadow-xl hover:scale-105 transition-all outline-none border-none" asChild>
                    <Link to="/signup">Ready to Explore?</Link>
                </Button>
            </main>
        </div>
    );
};

export default LearnMore;
