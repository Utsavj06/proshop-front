import { useEffect, useState } from "react";

const Carousel = ({swiperImag}) => {
    const [imgIndex, setImgIndex] = useState(0)

    useEffect(() => {
      const timer = setTimeout(() => {
        if(imgIndex == swiperImag.length-1){
          setImgIndex(0)
          return
        }
        setImgIndex(prevIndex => prevIndex + 1); 
      }, 3500);
    
      return () => clearTimeout(timer);  
    }, [imgIndex]); 

    const handleCarouselNavigation = (e) => {
      const pageWidth = window.innerWidth;

      if(e.clientX < pageWidth/2){
        if(imgIndex == 0){
          setImgIndex(swiperImag.length-1)
          return
        }
        setImgIndex(prev => prev-1)
      } else {
        if(imgIndex == swiperImag.length-1){
          setImgIndex(0)
          return
        }
        setImgIndex(prev => prev+1)
      }
    }

    const handleDotClick = (element) => {
      setImgIndex(element+1)
    }

    return (
      <div className="carousel" onClick={handleCarouselNavigation}>
        <div className="carousel-dot">
        {swiperImag.map((_, index) => {
          return <span key={index} className={index == imgIndex? 'carousel-select': ''}
                      onClick={() => handleDotClick(index)}>
                      .
                      </span>
        })}
        </div>
        <img src={swiperImag[imgIndex]} alt="carousel" style={{width: '100%', height: '200px'}}/>
      </div>
    )
}

export default Carousel;