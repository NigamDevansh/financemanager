import Header from "../components/Header";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-background text-foreground flex flex-col relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Elements */}
            <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/20 blur-[100px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-blue-900/20" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-300/20 blur-[120px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen dark:bg-emerald-900/20" />
            
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-20 relative z-10 flex flex-col items-center">
                <div className="max-w-3xl w-full text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-emerald-500 pb-4">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-muted-foreground mt-4 leading-relaxed font-medium">
                        Have questions about the app? Check out our fictional contact details below. We'd love to hear from you... hypothetically!
                    </p>
                </div>

                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Email Us</h3>
                        <p className="text-muted-foreground mb-4">For all non-existent inquiries and imaginary support requests.</p>
                        <p className="font-semibold text-foreground mt-auto">hello@finance-manager-demo.test</p>
                    </div>

                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Call Us</h3>
                        <p className="text-muted-foreground mb-4">Our simulated operations team is available 24/7 in our imagination.</p>
                        <p className="font-semibold text-foreground mt-auto">+1 (555) 019-8472</p>
                    </div>

                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                        <p className="text-muted-foreground mb-4">Drop by our absolutely spectacular, incredibly fake headquarters.</p>
                        <p className="font-semibold text-foreground mt-auto">123 Fictional Blvd,<br/>Cloud City, Web 90210</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;
