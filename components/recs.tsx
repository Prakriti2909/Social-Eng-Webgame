"use client"
import {useState, useRef, useEffect} from "react"
const Recs: React.FC = () => {
    const recs = [
        { title: "Identify Phishing Emails",
            description: "Log into your inbox, identify and report flags and gain points!",
             bg: "/images/phishing.png"

         },
        { title: "Deepfake Awareness", 
            description:"Protect yourself agasint AI generated images",
            bg:"images/img2.jpeg"
        },
    { title: "Social Media Scams ",
        description: "Learn how profiling is done.",
        bg: "/images/img3.jpeg"
    },

    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3; 
    if (window.innerWidth >= 768) return 2; 
    return 1; 
  };

  const getGap = () => {
    if (typeof window === 'undefined') return 32;
    if (window.innerWidth >= 1024) return 32;  
    if (window.innerWidth >= 768) return 24;  
    return 16;                                  
  };

  const updateCarousel = () => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards.length === 0) return;
    
    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
    const gap = getGap();
    const offset = -currentIndex * (cardWidth + gap);
    carouselRef.current.style.transform = `translateX(${offset}px)`;
  };

  useEffect(() => {
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }, [currentIndex]);

  const handlePrevious = () => {
    const visibleCards = getVisibleCards();
    const maxIndex = recs.length - visibleCards;
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  };

  const handleNext = () => {
    const visibleCards = getVisibleCards();
    const maxIndex = recs.length - visibleCards;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const visibleCards = getVisibleCards();
  const maxIndex = recs.length - visibleCards;
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

    return(
        <section>
                  <div className="py-10 px-[4%] md:px-[8%] bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-white drop-shadow-[0_0_8px_#00F5FF]">
              Recommendations for the day!
            </h2>

          </div>

          {/* Carousel */}
          <div className="relative w-full px-0 md:px-4 lg:px-8">
            <div className="overflow-hidden">
              <div 
                ref={carouselRef}
                className="flex gap-4 md:gap-6 lg:gap-8 justify-between transition-transform duration-500 ease-in-out"
              >
                {recs.map((recs, i) => (
                  <div
                    key={i}
                    className="min-w-0 shrink-0 grow-0 basis-full md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-21.333px)]"
                  >
                    <div className="group relative w-full min-h-[260px] rounded-2xl 
overflow-hidden border-2 border-[#00F5FF]/40 hover:border-[#00F5FF]
flex flex-col justify-end p-6 text-white">

                {/* 1️⃣ Background image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${recs.bg})` }}
                />

                {/* 2️⃣ Dark overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

                {/* 3️⃣ Content (above background) */}
                <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="text-xl font-semibold drop-shadow-[0_0_8px_#00F5FF]">
                    {recs.title}
                    </h3>

                    <p className="text-sm text-gray-200 drop-shadow-[0_0_8px_#00F5FF]">
                    {recs.description}
                    </p>

                    <button className="mt-2 px-3 py-2 bg-black text-white rounded-lg text-sm self-start hover:scale-110">
                    Start Now
                    </button>
                </div>

                </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows 
          <div className="mt-8 md:mt-12 flex justify-center gap-4 md:gap-6">
            <button 
              onClick={handlePrevious}
              aria-label="Previous"
              disabled={isPrevDisabled}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isPrevDisabled 
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed' 
                  : 'border-[#0099FF] text-[#0099FF] hover:bg-[#0099FF] hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next"
              disabled={isNextDisabled}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isNextDisabled 
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed' 
                  : 'border-[#0099FF] text-[#0099FF] hover:bg-[#0099FF] hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>*/}
        </div>
      </div>
        </section>

    );
}

export default Recs;