type Props = {
    name: string,
    address: string,
}

const Card = ({ name, address }: Props): JSX.Element => {
  return (
    <div class="flex flex-col p-5">
        <div class="font-bold card-title">
            {name}
        </div>
        <div class="card-body">
        <div class="flex gap-2 items-center">
            <i class="fa-solid fa-location-dot"></i>
            <p>
                {address}
            </p>
        </div>
        </div>
    </div>
  )
}

export default Card;