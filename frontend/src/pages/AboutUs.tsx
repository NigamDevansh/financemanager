import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-background text-foreground flex flex-col relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/20 blur-[100px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-purple-900/20" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-pink-300/20 blur-[120px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-pink-900/20" />
            
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-20 relative z-10 flex flex-col items-center">
                <div className="max-w-3xl w-full text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-fuchsia-500 pb-4">
                        About Finance Manager App
                    </h1>
                    <p className="text-xl text-muted-foreground mt-4 leading-relaxed font-medium">
                        We believe that tracking your finances shouldn't be a chore. It should be a beautiful, seamless, and insightful experience.
                    </p>
                </div>

                <div className="w-full max-w-4xl bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl p-8 md:p-12 text-left mb-16">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Our Story</h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                        Founded by a small group of design-obsessed developers, Finance Manager App was created to solve a simple problem: most budget trackers look like spreadsheets. We set out to build a platform that brings premium aesthetics together with powerful financial analytics. Our mission is to help you take control of your wealth without compromising on user experience.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-foreground">What Drives Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="p-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                            <h3 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-2">Simplicity First</h3>
                            <p className="text-sm text-muted-foreground">Financial data can be overwhelming. We prioritize clean interfaces to surface the insights that actually matter.</p>
                        </div>
                        <div className="p-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10">
                            <h3 className="text-lg font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2">Uncompromising Design</h3>
                            <p className="text-sm text-muted-foreground">A premium experience encourages better habits. We sweat the details so you enjoy interacting with your money.</p>
                        </div>
                    </div>
                </div>

                <Button size="lg" className="h-14 px-10 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl shadow-xl hover:scale-105 transition-all outline-none border-none" asChild>
                    <Link to="/signup">Join Us Today</Link>
                </Button>
            </main>
        </div>
    );
};

export default AboutUs;
