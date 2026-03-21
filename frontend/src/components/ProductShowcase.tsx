import { BarChart3, Lock, TrendingUp } from "lucide-react";

const features = [
    {
        icon: TrendingUp,
        title: "Track Spending",
        description: "Monitor income and expenses in real-time with intuitive categorization.",
        gradient: "from-violet-500 to-fuchsia-500",
        glow: "group-hover:shadow-violet-500/25",
    },
    {
        icon: BarChart3,
        title: "Visual Analytics",
        description: "Beautiful charts and graphs that make understanding your finances effortless.",
        gradient: "from-cyan-500 to-blue-500",
        glow: "group-hover:shadow-cyan-500/25",
    },
    {
        icon: Lock,
        title: "Secure & Private",
        description: "Bank-grade encryption keeps your financial data safe and private.",
        gradient: "from-emerald-500 to-teal-500",
        glow: "group-hover:shadow-emerald-500/25",
    },
];

const ProductShowcase = () => {
    return (
        <section className="pb-20 md:pb-32 relative">
            {/* Section heading */}
            <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                    Why Choose Us
                </p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                    Everything you need to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                        manage money
                    </span>
                </h2>
            </div>

            {/* Feature cards grid */}
            <div className="container mx-auto px-8 sm:px-16 md:px-24 lg:px-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className={`group relative rounded-2xl p-[1px] bg-gradient-to-br ${feature.gradient} transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl ${feature.glow}`}
                        >
                            <div className="relative rounded-2xl bg-white/90 dark:bg-black/60 backdrop-blur-xl p-8 h-full flex flex-col items-center text-center">
                                {/* Icon circle */}
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                >
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
