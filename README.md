# Setup development environment

## Installation

Clone the repository and specify de the dev branch with -d option, once that's done you can use docker compose command for build and start db container after that you can do the same thing with the bookhair container (don"t forget the -d option this will allow you to run containers in the background, so you can continue interacting with bash.

```bash
git clone git@github.com:younes101020/BookHair.git -d dev
cd BookHair
docker compose up db -d
docker compose up bookhair -d
```

you can now explore the application from this url [bookhair](http://localhost:3000/)

## Data

your database data will be persisted inside postgres-data folder in the root of the project

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
