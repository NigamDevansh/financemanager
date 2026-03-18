import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../components/ProductShowcase";

const LandingPage = () => {
    return (
        <div className="bg-white font-sans text-gray-800">
            <Header />
            <main>
                <HeroSection />
                <ProductShowcase />
            </main>
        </div>
    )
}

export default LandingPage;
