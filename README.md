# Telegram Mini App Demo

[//]: # (IMAGE_HERE - хидер)

This repository provides an example of developing a [mini-application](https://core.telegram.org/bots/webapps#initializing-mini-apps) called the "Mini App Store" for the Telegram platform. You can access a live test version of the application by following [this link](https://t.me/tg_app_store_bot/store).

Key features:

* Browsing applications by categories
* Adding applications to favorites
* Rating applications
* Launching applications directly from the store

The Russian version of the documentation is available [🇷🇺 here](README-RU.md)

[//]: # (IMAGE_HERE - скрины приложения)

## Technical stack

This example uses the following technical stack: HTML, JS, CSS, Kotlin, [Ktor](https://ktor.io/), [Heroku](https://www.heroku.com/).

To comfortably explore this example, basic knowledge of web development is required. Basic proficiency in HTML, JS, and CSS is sufficient. Basic knowledge of the Kotlin language is desirable to understand the server part.

# Usage

You can use this repository as a starting point when creating your own Telegram Mini Apps. The source code for the client and server represents a minimalist set of methods, sufficient for understanding the basics of developing your own applications. Many things are intentionally simplified to avoid overloading the test example with unnecessary details. At the same time, the focus is on important nuances that should be taken into account when developing your own application.

## Quick start

To get started, let's prepare your own version of the project and run your own bot.

### Fork the repository

To be able to make your own changes and receive updates, create a [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) of the current repository.

### Telegram Bot

Create your bot in Telegram. If you've never worked with Telegram bots before, you can use one of the guides, such as [this one from the official documentation](https://core.telegram.org/bots/tutorial).

At this stage, we just need to obtain the bot token. You don't need to write the code for the bot. However, you can always add some functionality to a classic Telegram bot later on.

### Availability of index.html

Unlike a traditional Telegram bot, which requires a backend, a Telegram Mini App, in its minimal form, only requires a web page. The simplest and free way to host static HTML pages is by using GitHub itself. We will use [GitHub Pages](https://pages.github.com) to host the contents of our `webapp` directory. GitHub Pages allows you to host content in two places (at the time of writing): the root directory `/(root)` or the `/docs` directory. 

For the sake of organizing different parts of the project, our content is placed in the `/webapp` directory. To make it accessible for display on GitHub Pages, we use the [GitHub Pages Overwriter](https://github.com/marketplace/actions/github-pages-overwriter) plugin in the repository. Make sure it's working correctly in the `Actions` tab of your repository.

After cloning the repository, you need to explicitly enable Actions in the corresponding tab. Now, to run it, you need to make any commit. For example, you can open and edit the `LICENSE` file directly in the browser, changing the name to your own. After committing the changes, the `Frontend publishing` Action will be triggered.

[//]: # (IMAGE_HERE - скрины экшена)

If the Action runs with an error, ensure that the Actions have Read and write permissions. You can check this in your repository settings under `Settings -> Actions (Code and automation) -> General -> Workflow permissions`. Read and write permissions should be selected.

If the publication was successful, you can access the HTML page and view the content of our store at http://username.github.io/repository (in the current repository, it's http://landarskiy.github.io/tg-app-store).

[//]: # (IMAGE_HERE - скрин из браузера)

If, for any reason, after a successful Action run, the content of the webapp folder is not accessible via the GitHub Pages link, consult the documentation of the `GitHub Pages Overwriter plugin`. Check whether you have configured Pages correctly in your repository, whether the Action is triggered upon changes, whether the branch configured for the plugin exists. As a last resort, consider moving the content from the `/webapp` directory to the `/docs` directory, as required by GitHub Pages. In this case, you won't need to use the mentioned plugin.

### Connecting the Mini App to the Bot

Following the [official instructions](https://core.telegram.org/bots/webapps#launching-mini-apps-from-the-menu-button), add the path to the GitHub Pages repository page to the bot you previously created.

If everything is done correctly, you can enter your bot and open the store app in it through the menu button.

[//]: # (IMAGE_HERE - скрин кнопки меню)

Currently, your bot retrieves data from the main repository's server. This means there's a chance you won't see the actual app content (i.e., the presence of apps in the store). This situation can occur for various reasons: the server has stopped working, it's temporarily unavailable, and so on. However, in any case, regardless of the server's data source availability, the page should be loaded and displayed correctly, even if it's empty. Later on, we'll discuss how to get started without a server at the initial stage, but for now, let's not focus on that.

[//]: # (IMAGE_HERE - скрин страницы магазина)

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

[//]: # (IMAGE_HERE - скрин из IDE)

When you first run it, the value next to Telegram bot token will be `0` in the logs. This is because we have not set the environment variable. Follow this [instruction](https://www.jetbrains.com/help/objc/add-environment-variables-and-program-arguments.html#add-environment-variables) to add a value for the `TELEGRAM_BOT_TOKEN` variable, and then restart the server. Now, the value should be different from `0`.

[//]: # (IMAGE_HERE - скрин из IDE)

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

[//]: # (IMAGE_HERE - скрин из Heroku)

Follow the [instructions](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) to set the environment variable `TELEGRAM_BOT_TOKEN` in the Heroku Dashboard.

[//]: # (IMAGE_HERE - скрин из Heroku)

After that, start your application and check the [logs](https://devcenter.heroku.com/articles/logging#view-logs-with-the-heroku-dashboard). They should contain the same information as when running the local server. Retrieve the address of your server from there and update `config.json`. It should look similar to this:

```js
const configuration = {
    serverUrl: "https://tgminiapp-65728c571d53.herokuapp.com"
}
```

[//]: # (IMAGE_HERE - скрин из Heroku)

# Application components

After completing the previous step, you now have a fully functional production-ready application. Let's take a closer look at each part of it. Some aspects of the application's operation were already described during the setup process. Here, we'll provide more detailed information about other aspects of its functionality.

## Webapp

The `webapp` is a lightweight user interface (UI) displayed within the Telegram bot. Its source code is located in the webapp folder. Essentially, it is a minimalist web project consisting of HTML, CSS, and JavaScript without unnecessary dependencies. It implements the concept of a single web page application, where all the required scripts and styles for generating pages are loaded only once. The pages themselves are constructed based on small portions of data received from the backend. This approach minimizes the time required to generate a new page, which is particularly important for creating smooth and fast applications.

The main and only HTML page is `index.html`, which serves as a wrapper. It includes the necessary CSS and JavaScript dependencies and contains a single element called `frame-root`. This element dynamically loads the displayed pages.

```html
<body>
    <div id="frame-root" class="frame-container"></div>
</body>
```

### navigation.js

It's a lightweight framework for implementing the concept of a single web page application. It provides essential methods for replacing, adding, and removing screen pages within the `frame-root` frame. One of its useful functions is automatically updating the `window.Telegram.WebApp.BackButton.isVisible` property when the page stack changes.

When working on your own version of an application based on this project, it is recommended to use the methods from this file to minimize navigation errors.

### *-app.js

Application pages. Each such file contains a `display*` method that should be called when you need to open a page. For example, the `page-main.js` file contains the following method:

```js
function displayMainPage() {
    replaceTopPage("main-page", mainPage());
    loadApps(selectedCategoryId);
    selectCategoryOnUi(selectedCategoryId);
}
```

It is called after `index.html` has been completely loaded, including all styles and necessary resources:

```js
window.onload = function() {
    displayMainPage();
};
```

Above is a snippet from the `main.js` file, which is the main entry point of the application.

### webapp/css

The main `style.css` file contains the styles used in the application. In the folder, there are two additional files: `css-class-name-generator.sh` and `css-class-names.js`. Since our application generates all the content on the spot in js files, it's convenient to have access to the style class names without the need to copy their names every time.

To solve this issue, you can run the `css-class-name-generator.sh` script each time you add or modify a class in the `style.css` file. This script generates the `css-class-names.js` file, which is a js file with constants for the class names from `style.`css. This approach allows you to use autocompletion while coding the blocks in your js files.

Here's an example of the generated file:

```js
// Generated class names from style.css
const cssFrameContainer = "frame-container";
const cssPageContainer = "page-container";
const cssContainerScrollH = "container-scroll-h";
```

If your CSS file has a different name or you want to change the name of the output file, you can modify the lines in `css-class-name-generator.sh` responsible for naming or enhance the script to accept these values as arguments.

## Backend

The backend part handles user requests and is located in the `backend` folder. The server project is a classic [Ktor server](https://ktor.io/docs/create-server.html).

The project uses 3 basic plugins: [Routing](https://ktor.io/docs/routing-in-ktor.html) for request handling, [CORS](https://ktor.io/docs/cors.html) for proper client-side functioning, and [Content negotiation](https://ktor.io/docs/serialization.html) for object serialization and deserialization.

### src/main/resources

In addition to the standard files required for configuring and running the server, this directory contains files with test data: `mock-app-details.json` - a file with a list of applications, and `mock-app-rating.json` - a file with some ratings for these applications.

To simplify the example, the server does not support integration with a database management system (DBMS) and does not persist data across restarts. When the server restarts, all data is reset to the state described in the aforementioned files.

The server's architecture makes it easy to implement database integration, as will be explained below, but this is beyond the scope of this example.

### src/main/kotlin/.../repository

It contains handler classes for each of the requests sent from our application. The most crucial aspect in these handlers is user identification.

The client application adds the [initData](https://core.telegram.org/bots/webapps#initializing-mini-apps) value to the request body for each method call. The server uses this data to understand on behalf of which user the request is being made. This information is necessary to provide the user with relevant information about which apps are added to favorites, which ratings have been given, and to prevent the leakage of this data to unauthorized users.

To ensure that the data is sent from the user specified in `initData`, validation is implemented according to the [algorithm](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app) described in the documentation. This is why we needed our bot's token.

You can view the validation code in the `InitDataParser.kt` file. This class is used in all handler methods before populating the response with private data.

For example, the code that generates the response for the list of applications looks following:

```kotlin
override suspend fun handle(call: ApplicationCall) {
    val initDataModel = initDataParser.parseInitData(call)
    val userId = initDataModel?.userModel?.id
    log.info("Call from user: $userId")
    val categoryId = call.parameters["category_id"] ?: CATEGORY_ID_ALL
    val userBookmarkedApps = userId?.let { userRepository.getUserAppBookmarks(it) } ?: emptySet()
    val rawApps = when (categoryId) {
        CATEGORY_ID_ALL -> appRepository.getAllApps().sortedByDescending { it.rating }
        CATEGORY_ID_BOOKMARKED -> appRepository.getApps(userBookmarkedApps).sortedBy { it.title }
        else -> appRepository.getApps(categoryId).sortedByDescending { it.rating }
    }
    val returnApps = rawApps.map {
        NetworkAppModel.fromModel(it).copy(bookmarked = userBookmarkedApps.contains(it.id))
    }
    call.respondText(Json.encodeToString(returnApps), ContentType.Application.Json, HttpStatusCode.OK)
}
```

In case of data validation errors or absence of `initData`, the `initDataParser` will return a `null` object. Consequently, the server will consider the request as anonymous and will only provide public information without any personalization.

That's why, in the initial steps of the documentation when we cloned the application, we could see the data but couldn't rate or add apps to favorites.

If you want to restrict access to your data outside of the Telegram app, you can handle this case more strictly and return an error if you detect that `initData` is invalid.

### Heroku

To deploy the project on Heroku, the project contains a `Procfile`. You can learn more about integrating the project with Heroku from the official [Ktor guide](https://ktor.io/docs/heroku.html).