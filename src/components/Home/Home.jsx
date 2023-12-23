import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import Footer from '../Footer/Footer'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'





export default function Home() {

  return  <>
  <div className="container my-5">
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>
  </div>
  <Footer />
    </>
}




