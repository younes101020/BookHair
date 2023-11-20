import Hero from "@/components/hero";
import SearchForm from "@/components/client/SearchForm";
import Image from  'next/image';

export default function Home() {
  return (
    <div>
      <main className="h-screen flex flex-wrap items-center justify-center w-full bg-gray-400 bg-black">
          <div className="absolute inset-0">
              <Image
                  src="/img/hero.jpg"
                  fill
                  alt="Hero banner promotion image"
                  quality={100}
                  sizes='100vw'
                  style={{
                      objectFit: 'cover',
                      filter: 'grayscale(100%) brightness(0.5)',
                  }}
              />
          </div>
          <Hero />
          <SearchForm />
          <svg id="wave" className="absolute bottom-0 left-0 transform rotate-0 transition duration-300" viewBox="0 0 1440 110" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(255, 255, 255, 1)" offset="0%"></stop><stop stopColor="rgba(255, 255, 255, 1)" offset="100%"></stop></linearGradient></defs><path className="transform translate-x-0 translate-y-0 opacity-100" fill="url(#sw-gradient-0)" d="M0,77L120,64.2C240,51,480,26,720,27.5C960,29,1200,59,1440,64.2C1680,70,1920,51,2160,42.2C2400,33,2640,33,2880,42.2C3120,51,3360,70,3600,69.7C3840,70,4080,51,4320,49.5C4560,48,4800,62,5040,58.7C5280,55,5520,33,5760,34.8C6000,37,6240,62,6480,73.3C6720,84,6960,81,7200,77C7440,73,7680,70,7920,66C8160,62,8400,59,8640,51.3C8880,44,9120,33,9360,27.5C9600,22,9840,22,10080,20.2C10320,18,10560,15,10800,11C11040,7,11280,4,11520,11C11760,18,12000,37,12240,36.7C12480,37,12720,18,12960,9.2C13200,0,13440,0,13680,14.7C13920,29,14160,59,14400,58.7C14640,59,14880,29,15120,20.2C15360,11,15600,22,15840,25.7C16080,29,16320,26,16560,34.8C16800,44,17040,66,17160,77L17280,88L17280,110L17160,110C17040,110,16800,110,16560,110C16320,110,16080,110,15840,110C15600,110,15360,110,15120,110C14880,110,14640,110,14400,110C14160,110,13920,110,13680,110C13440,110,13200,110,12960,110C12720,110,12480,110,12240,110C12000,110,11760,110,11520,110C11280,110,11040,110,10800,110C10560,110,10320,110,10080,110C9840,110,9600,110,9360,110C9120,110,8880,110,8640,110C8400,110,8160,110,7920,110C7680,110,7440,110,7200,110C6960,110,6720,110,6480,110C6240,110,6000,110,5760,110C5520,110,5280,110,5040,110C4800,110,4560,110,4320,110C4080,110,3840,110,3600,110C3360,110,3120,110,2880,110C2640,110,2400,110,2160,110C1920,110,1680,110,1440,110C1200,110,960,110,720,110C480,110,240,110,120,110L0,110Z"></path></svg>
        </main>
      </div>
  )
}