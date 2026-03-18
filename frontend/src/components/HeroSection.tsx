import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
    return (
        <section className="text-center py-20 md:py-32 relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
            {/* Premium Ambient Background Elements */}
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-purple-400/20 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[400px] bg-pink-400/20 blur-[150px] rounded-full -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[300px] bg-blue-300/20 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm mb-8">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium tracking-wide text-foreground uppercase">The Ultimate Finance Tracker</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-orange-400 pb-4 drop-shadow-sm">
                    Take Control of<br />Your Finances
                </h1>
                
                <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                    Your foundation for secure, intelligent financial management. Effortlessly track your income and expenses to achieve your financial goals.
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
                    <div className="relative group w-full sm:w-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <Button size="lg" className="relative w-full sm:w-auto text-lg h-14 px-8 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-0 hover:from-violet-500 hover:to-fuchsia-400 rounded-xl shadow-xl transition-all hover:scale-105" asChild>
                            <Link to="/signup">
                                Start Tracking for Free
                            </Link>
                        </Button>
                    </div>
                    
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 group bg-white/50 dark:bg-black/20 backdrop-blur-md border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-all" asChild>
                        <Link to="/learn-more">
                            Learn More <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
