# Telegram Mini App Demo

This repository provides an example of developing a mini-application called the "Mini App Store" for the Telegram platform. You can access a live test version of the application by following [this link](https://t.me/tg_app_store_bot).

Key features:

* Browsing applications by categories
* Adding applications to favorites
* Rating applications
* Launching applications directly from the store

The Russian version of the documentation is available [🇷🇺 here](README-RU.md)

## Technical Stack

This example uses the following technical stack: HTML, JS, CSS, Kotlin, [Ktor](https://ktor.io/), [Heroku](https://www.heroku.com/).

To comfortably explore this example, basic knowledge of web development is required. Basic proficiency in HTML, JS, and CSS is sufficient. Basic knowledge of the Kotlin language is desirable to understand the server part.

# Usage

You can use this repository as a starting point when creating your own Telegram Mini Apps. The source code for the client and server represents a minimalist set of methods, sufficient for understanding the basics of developing your own applications. Many things are intentionally simplified to avoid overloading the test example with unnecessary details. At the same time, the focus is on important nuances that should be taken into account when developing your own application.

## Quick Start

To get started, let's prepare your own version of the project and run your own bot.

### Fork the Repository

To be able to make your own changes and receive updates, create a fork of the current repository.

### Telegram Bot

Create your bot in Telegram. If you've never worked with Telegram bots before, you can use one of the guides, such as [this one from the official documentation](https://core.telegram.org/bots/tutorial).

At this stage, we just need to obtain the bot token. You don't need to write the code for the bot. However, you can always add some functionality to a classic Telegram bot later on.

### Availability of index.html

Unlike a traditional Telegram bot, which requires a backend, a Telegram Mini App, in its minimal form, only requires a web page. The simplest and free way to host static HTML pages is by using GitHub itself. We will use [GitHub Pages](https://pages.github.com) to host the contents of our webapp directory. GitHub Pages allows you to host content in two places (at the time of writing): the root directory `/(root)` or the `/docs` directory. 

For the sake of organizing different parts of the project, our content is placed in the `/webapp` directory. To make it accessible for display on GitHub Pages, we use the [GitHub Pages Overwriter](https://github.com/marketplace/actions/github-pages-overwriter) plugin in the repository. Make sure it's working correctly in the `Actions` tab of your repository.

If the Action runs with an error, ensure that the Actions have Read and write permissions. You can check this in your repository settings under `Settings -> Actions (Code and automation) -> General -> Workflow permissions`. Read and write permissions should be selected.

If the publication was successful, you can access the HTML page and view the content of our store at http://username.github.io/repository (in the current repository, it's http://landarskiy.github.io/tg-app-store).

If, for any reason, after a successful Action run, the content of the webapp folder is not accessible via the GitHub Pages link, consult the documentation of the `GitHub Pages Overwriter plugin`. Check whether you have configured Pages correctly in your repository, whether the Action is triggered upon changes, whether the branch configured for the plugin exists. As a last resort, consider moving the content from the `/webapp` directory to the `/docs` directory, as required by GitHub Pages. In this case, you won't need to use the mentioned plugin.

### Connecting the Mini App to the Bot

Following the [official instructions](https://core.telegram.org/bots/webapps#launching-mini-apps-from-the-menu-button), add the path to the GitHub Pages repository page to the bot you previously created.

If everything is done correctly, you can enter your bot and open the store app in it through the menu button.

Currently, your bot retrieves data from the main repository's server. This means there's a chance you won't see the actual app content (i.e., the presence of apps in the store). This situation can occur for various reasons: the server has stopped working, it's temporarily unavailable, and so on. However, in any case, regardless of the server's data source availability, the page should be loaded and displayed correctly, even if it's empty. Later on, we'll discuss how to get started without a server at the initial stage, but for now, let's not focus on that.

You may also notice that some functions, such as adding to favorites and rating, don't work correctly. This is because client validation occurs on the server. We'll discuss this aspect a little later as well.

### Additional Information

As you can see from the instructions, it only takes three simple steps to start developing a Telegram Mini App. You don't even need to write the server-side part. For example, if you're creating a simple application like a calculator or a simple game that doesn't require interaction with a server, you don't need to validate user data, and the capabilities of pure HTML, JS, and CSS will suffice. The previous steps will be enough to ensure that your application functions successfully within the Telegram environment.

## Setting up the environment

To run the backend locally, you'll need to install:

* Java 17 or higher

Recommended IDEs for working with the project (you can choose others that you're more familiar with):

* [Visual Studio Code](https://code.visualstudio.com/) for working with the frontend part
* [Intellij Idea Community Edition](https://www.jetbrains.com/help/idea/installation-guide.html) for working with the backend part

Service for deploying the backend (optional):

* The example uses [Heroku](https://dashboard.heroku.com/), but any similar platform for deploying Java applications will work.

You can run the server-side locally, and in this case, debugging and development can be done in a regular web browser. Keep in mind that in this mode, none of the properties from [telegram-web-app.js](https://core.telegram.org/bots/webapps#initializing-mini-apps) will be accessible, and the methods won't work as documented. If you plan to access the local server through a bot, make sure the server is accessible outside the local network. This setup is beyond the scope of the current example.

## Repository structure

The repository consists of two main parts: frontend and backend. The structure looks like this:

```
tg-app-store
├─ backend
│  ├─ src
│  │  ├─ ...
│  │  ... 
│  ├─ build.gradle.kts
│  ...
├─ webapp
│  ├─ index.html
│  ├─ css
│  │  ├─ ...
│  │  ...
│  ├─ stub
│  │  ├─ ...
│  │  ...
│  ...
└─ README.md
```

Where `webapp` is a minimalist web project (HTML, CSS, JS) without unnecessary dependencies, and `backend`` is an Kotlin Gradle project representing a [Ktor](https://ktor.io/) server.

## Work with project

You can work with the application in 3 modes:

* HTML-only sandbox without a backend. This mode allows you to test the frontend part both locally in a regular browser and through the Telegram application. With this method, it is not possible to correctly validate user data, and when adding new functionality to the backend, it is also necessary to implement local stubs in the js files.
* Sandbox with a local backend. Without additional configuration, the backend allows you to run the application only locally in a regular browser. To check it in Telegram, additional configuration to make the server accessible from outside is required.
* Production version. Like the first mode, it allows you to test the frontend part both locally in a regular browser and through the Telegram application. However, unlike the local sandbox, this mode allows safe validation of user data.

### HTML-only Sandbox

This mode of working with the project is primarily intended for layout design and testing the correctness of basic scenarios.

The idea of using this mode is that instead of real calls to our backend methods, we use calls to local functions that process data in a simplified form and emulate the response of a real server.

To use this mode in our example, you need to uncomment one line in the `index.html` file. It should look like this:

```html
    ...
    <script src="data-repository.js"></script>
    <!-- Uncomment mock-data-repository.js when you would like to test the app in a local sandbox mode, without real requests to the server -->
    <script src="stub/mock-data-repository.js"></script>
    <script src="css/css-class-names.js"></script>
    ...
```

Our mini-application communicates with the server through special delegate functions defined in another file, `data-repository.js`. For example, defining the method for fetching the list of applications looks like this:

```js
let loadAppListDelegate = function loadAppList(userId, categoryId, initData, successCallback, failCallback) {
    const params = { category_id: categoryId };
    if (userId) {
        params.user_id = userId;
    }
    const query = new URLSearchParams(params);
    fetch(`${configuration.serverUrl}/app/list?${query.toString()}`, buildInitDataPostParams(initData)).then(response => {
        if (!response.ok) {
            throw new Error('Error occured');
        }
        return response.json();
    }).then(data => {
        successCallback(data);
    }).catch(error => {
        failCallback(error);
    });
}
```

In the application, we call the method using the `loadAppListDelegate`` variable:

```js
function loadApps(category) {
    loadAppListDelegate(
        window.Telegram.WebApp.initDataUnsafe?.user?.id,
        category,
        initDataProviderDelegate(),
        data => {
            displayApps(data);
        },
        error => { }
    );
}
```

When the `mock-data-repository.js` file is included, this variable will be overwritten, and instead of calling the function above, another function defined in `mock-data-repository.js` will be called:

```js
loadAppListDelegate = function loadAppList(userId, categoryId, initData, successCallback, failCallback) {
    let returnList = [];
    for (app of stubApps) {
        let userApp = { ...app };
        userApp.fav = stubUserFavorites[app.id];
        returnList.push(userApp);
    }
    successCallback(returnList);
}
```

This architecture allows for quickly developing prototypes, focusing primarily on what the application looks like. However, this approach has some drawbacks: you need to write additional code for each server request, and there is no way to validate user data.

### Local backend

Running a local backend is the preferred method during active application development. You can start the local backend in two ways.

#### Running from the command line

The easiest way is to run it from the command line in the `backend` directory. Before starting the server, you need to set the `TELEGRAM_BOT_TOKEN` environment variable, which you obtained when creating the bot. This is necessary for the correct validation of data that will come to your server. To set the environment variable, execute the following command in the terminal (macOS, Linux):

```bash
export TELEGRAM_BOT_TOKEN="your token here"
```

After setting the token as an environment variable, you can start the server by running the following command in the terminal (macOS, Linux):

```bash
./gradlew runFatJar
```

If everything is done correctly, the console will display startup logs with initialization information:

```
[main] INFO  Application - Autoreload is disabled because the development mode is off.
[main] DEBUG Application - Repository initialization started
[main] DEBUG Application - Repository initialization finished
[main] INFO  Application - Telegram bot token loaded, hash: 1979904964
[DefaultDispatcher-worker-1] TRACE i.ktor.client.plugins.HttpPlainText - Adding Accept-Charset=UTF-8 to https://api.ipify.org
[main] INFO  Application - Application started in 0.379 seconds.
[DefaultDispatcher-worker-4] INFO  Application - Responding at http://0.0.0.0:8080

```

In this log, we are interested in two values. Make sure that `Telegram bot token loaded, hash:` is not equal to `0`. If it's `0`, double-check the environment variable setup command. The second value is the local address of our server, which comes after the `Application - Responding at` line. In the above log, the server's address is `http://0.0.0.0:8080`.

#### Running from IDE

The second method requires [Intellij Idea Community Edition](https://www.jetbrains.com/help/idea/installation-guide.html) to be installed. To get started, open the `backend` project. You can do this the first time from the IDE menu by selecting `File -> Open...` and choosing the `build.gradle.kts` file. When you open it for the first time, the IDE will generate a `.idea` folder, indicating that the current directory is a project. After that, you can open the folder directly in the IDE, rather than the `build.gradle.kts` file.

Wait for the project synchronization to complete, and then open the `Application.kt` file located at `src/main/kotlin/io/github/landarskiy/Application.kt`. Next to the `fun main(args: Array<String>)` method, you will see a green arrow, which you need to click to run the project directly in the IDE.

When you first run it, the value next to Telegram bot token will be `0` in the logs. This is because we have not set the environment variable. Follow this [instruction](https://www.jetbrains.com/help/objc/add-environment-variables-and-program-arguments.html#add-environment-variables) to add a value for the `TELEGRAM_BOT_TOKEN` variable, and then restart the server. Now, the value should be different from `0`.

#### Updating Frontend

To make our application send requests to our server, open the `/webapp/config.json` file and replace `serverUrl` with the address of your local server. After making the changes, the `config.json` file should looks following:

```js
const configuration = {
    serverUrl: "http://0.0.0.0:8080"
}
```

Now, open `/webapp/index.html` in your browser, and you should see the application page. In the server logs, requests for content should be displayed in the following format:

```
[eventLoopGroupProxy-4-1] TRACE io.ktor.routing.Routing - Trace for [app, list]
/, segment:0 -> SUCCESS @ /
  /app, segment:1 -> SUCCESS @ /app
    /app/list, segment:2 -> SUCCESS @ /app/list
      /app/list/(method:POST), segment:2 -> SUCCESS @ /app/list/(method:POST)
    /app/details, segment:1 -> FAILURE "Selector didn't match" @ /app/details
    /app/rating, segment:1 -> FAILURE "Selector didn't match" @ /app/rating
  /user, segment:0 -> FAILURE "Selector didn't match" @ /user
Matched routes:
  "" -> "app" -> "list" -> "(method:POST)"
Route resolve result:
  SUCCESS @ /app/list/(method:POST)
```

### Production backend

The first method is convenient for checking how the application looks in Telegram but doesn't allow proper testing of the business logic. The second method is suitable for active development but doesn't allow you to check the correctness of the application's display in Telegram. To get the complete picture, you need to publish your server on one of the hosting platforms.

Unfortunately, there are no free Java hosting providers on the market, but you can find relatively inexpensive options that allow you to host your server for a reasonable cost (less than $10 per month). Of course, you can run a local server, which is almost free, but that's beyond the scope of our example.

Follow the [official instructions](https://ktor.io/docs/heroku.html) to deploy your server instance on [Heroku](https://dashboard.heroku.com/). Due to the fact that our server code is not located in the root directory, you will need additional configuration for Heroku to recognize our project. Use the instructions and install the [subdir-heroku-buildpack](https://elements.heroku.com/buildpacks/timanovsky/subdir-heroku-buildpack).

Follow the [instructions](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) to set the environment variable `TELEGRAM_BOT_TOKEN` in the Heroku Dashboard.

After that, start your application and check the [logs](https://devcenter.heroku.com/articles/logging#view-logs-with-the-heroku-dashboard). They should contain the same information as when running the local server. Retrieve the address of your server from there and update `config.json`. It should look similar to this:

```js
const configuration = {
    serverUrl: "https://tgminiapp-65728c571d53.herokuapp.com"
}
```