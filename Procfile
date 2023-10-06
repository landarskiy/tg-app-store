heroku buildpacks:clear
heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
heroku buildpacks:add heroku/gradle
heroku config:set PROJECT_PATH=backend
web: ./backend/build/install/tgappstore/bin/tgappstore