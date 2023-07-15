import Image from 'next/image';

export default function Header(): JSX.Element {
    return (
        <header className='flex py-5 px-3 bg-opacity-75 absolute z-10 w-full top-0 bg-black border-b-2 border-b-white'>
            <Image
                src="/img/bookhair.png"
                width={150}
                height={10}
                alt="Logo of the application"
            />
        </header>
    );
}