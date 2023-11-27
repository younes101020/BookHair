# Setup development environment

## Installation

Clone the repository and specify de the dev branch with -b option, once that's done you can use docker compose command for build and start db container after that you can do the same thing with the bookhair container (don"t forget the -d option this will allow you to run containers in the background, so you can continue interacting with bash).

```bash
git clone git@github.com:younes101020/BookHair.git -b dev
cd BookHair
chmod +x bookhair/start.sh
docker compose up db -d
docker compose up bookhair
```

you can now explore the application from this url [bookhair](http://localhost:3000/)

## Data

your database data will be persisted inside postgres-data folder in the root of the project

## Common issue on windows

the git repository have an entry point script (bookhair/start.sh) with Unix line endings (\n). But when the repository was checked out on a windows machine, git decided to try and be clever and replace the line endings in the files with windows line endings (\r\n).

This meant that the shebang don't because instead of looking for /bin/bash, it was looking for /bin/bash\r.

The solution is to disable git's automatic conversion:

```bash
git config --global core.autocrlf input
```

Reset the repo using this (don't forget to save your changes):

```bash
git rm --cached -r .
git reset --hard
And then rebuild.
```

source: [here](https://stackoverflow.com/questions/38905135/why-wont-my-docker-entrypoint-sh-execute)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
