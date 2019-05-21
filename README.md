# The Game of Thrones Death Draft app

<https://gotdeathdraft.tk>

Disclaimer: this app was hacked together over some hours in the final weeks of Season 8 of Game of Thrones. __It does not contain high quality or readable code__, but it works. I'm a back-end guy who knows some framework-level Javascript.

## How to run

#### Overview of the server design

* The app is hosted on structure.sh, which allows running an Express app off the http/https ports (standard 80/443)
* UI client pages are served off `get` `/*` which allows react-router to route to any page
* `post` `/api/putData` handles users submitting their guesses off the main page
* __The app works as both a front and a back end this way!__

#### Repo structure and running

* The server is run from the top-level directory using `npm run start`
* The client UI exists in the `/client` folder
* You can run the whole app locally by running `npm run start` from the top level directory. Looking inside `package.json` you'll see that this first builds the client UI and then starts the server
* You can build and run just the client UI by running `npm run start` from the `/client` directory. This will start a development server through webpack
* __Important: the client is currently hardcoded to post data to the server at `https://gotdeathdraft.tk`__. I didn't bother setting up CORS and local back-end testing. You can replace this URL with wherever you are running the server.

#### Deploying

* Create an account at structure.sh and set up credentials
* From the top level directory, run `structure deploy you-app-name` __make sure you have changed the url of the server as mentioned in the last bullet point__. For example: if your app is hosted at `https://my-death-draft-app-username.structure.sh`, then you will have to hardcode the server as `https://my-death-draft-app-username.structure.sh` in the client UI before deploying.

### Data from S8 E5
<div>
    <a href="https://plot.ly/~jcallin/4/?share_key=z38Z4aF7ZZ6s0prWwsxmVc" target="_blank" title="Season 8 Episode 5" style="display: block; text-align: center;"><img src="https://plot.ly/~jcallin/4.png?share_key=z38Z4aF7ZZ6s0prWwsxmVc" alt="Season 8 Episode 5" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>
<div>
    <a href="https://plot.ly/~jcallin/7/?share_key=HFZCujQcHXmaIieskGs4xk" target="_blank" title="Season 8 Episode 5 Winners" style="display: block; text-align: center;"><img src="https://plot.ly/~jcallin/7.png?share_key=HFZCujQcHXmaIieskGs4xk" alt="Season 8 Episode 5 Winners" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
</div>
