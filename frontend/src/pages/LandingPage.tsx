import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../components/ProductShowcase";

const LandingPage = () => {
    return (
        <div className="bg-background font-sans text-foreground">
            <Header />
            <main>
                <HeroSection />
                <ProductShowcase />
            </main>
        </div>
    )
}

export default LandingPage;
