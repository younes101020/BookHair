
const Hero = (): JSX.Element => {
    return (
            <div className="relative z-20 max-w-2xl px-5 lg:h-full flex flex-col justify-center">
                <h1 className='text-7xl text-gray-200'>Dites <span className='underline italic'>au revoir</span> au file d’attente</h1>
                <p className='mt-4 text-xl text-white'><span className='font-bold'>BookHair</span> te permet de réserver ton passage chez le <span className='font-bold'>coiffeur</span>. Alors n'attends plus et inscris-toi.</p>
            </div>
            )
}

export default Hero;