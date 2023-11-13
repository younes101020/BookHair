import Card from '@/components/cards/coiffeur/card';

async function getCoiffeur() {
    const res = await fetch('https://api.example.com/...')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function CoiffeurPage({
    searchParams 
}: {
    searchParams: { [key: string]: string }
}) {
    const coiffeurs = await getCoiffeur(); 
    <Card queryString={searchParams} />
}