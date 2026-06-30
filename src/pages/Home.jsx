import CustomBlogsSection from '@/components/layouts/CustomBlogsSection';
import CustomBestSellingProductsSection from '@/components/layouts/CustomBestSellingProductsSection';
import CustomCategoryNavigation from '@/components/layouts/CustomCategoryNavigation';
import CustomDiscoverSection from '@/components/layouts/CustomDiscoverSection';
import CustomNewProductsSection from '@/components/layouts/CustomNewProductsSection';
import CustomVouchersSection from '@/components/layouts/CustomVouchersSection';
import CustomCarouselBanner from '@/components/partials/CustomCarouselBanner';

function Home() {
    return (
        <div>
            <CustomCarouselBanner />

            <CustomVouchersSection />

            <CustomCategoryNavigation />

            <CustomNewProductsSection />

            <CustomBestSellingProductsSection />

            <CustomDiscoverSection />

            <CustomBlogsSection />
        </div>
    );
}

export default Home;
