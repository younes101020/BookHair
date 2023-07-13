import Image from 'next/image';

export default function Header(): any {
    return (
        <header className='flex py-3'>
            <Image
                src="/img/bookhair.png"
                width={150}
                height={10}
                alt="Logo of the application"
            />
        </header>
    );
}