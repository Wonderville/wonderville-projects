# [wonderville projects](https://wondervilleprojects.org)

this is the wonderville projects website! this site is built using [11ty](https://www.11ty.dev/), and you may find their documentation useful.

## dependencies

there's only one dependency to install to get the project running locally.

### [nodejs](https://nodejs.org/)

if possible install nodejs version **16.19.1**. this is the version specified in the [`.node-version`](./.node-version) file. other versions may work, but you may also encounter weird errors!

there are [many](https://github.com/asdf-vm/asdf-nodejs) [ways](https://github.com/nvm-sh/nvm) [to](https://formulae.brew.sh/formula/node@16) [install](https://community.chocolatey.org/packages/nodejs-lts) [nodejs](https://nodejs.org/download/release/v16.20.2/), and how you choose to do so will depend on your system.

## setup

to get started running a local development server, you'll first need to install the npm packages. from a terminal in the project directory:

```sh
> npm install
```

## development

to run the development server

```sh
> npm start
```

you can then see the local site at http://localhost:8080.

## deployment

the site is automatically built and deployed to the web by [netlify](https://netlify.com). any time you push to main, the changes should be deployed within a minute or two.

the site deploys to https://wondervillleprojects.org.

## structure

the structure of site mirrors the structure of the `src` directory. the pages are built using [liquid templates](https://liquidjs.com/), which are `html` files with some some light templating ability.

### `.eleventy.js`

is the 11ty [configuration file](https://www.11ty.dev/docs/config/). you probably don't need to edit this, but you could!

### `src`

contains all the source files for the site.

every `.liquid` template you see in `src` will produce an `html` file accessible in the final site.

such to say, `donate.liquid` produces `donate.html` & is visible at http://localhost:8080/donate, and `programs/internship.liquid` produces `programs/internship.html` & is visible at http://localhost:8080/programs/internship`.

any `.css` or `.js` file and any file in the `img` or `font` directories will also be copied into the built site.

any directory that begins with an `_` is not copied into the site:

#### `_collections`

contains the site data. all of the content, represented as [markdown](https://www.markdownguide.org/) files (w/ the extention `.md`), lives here. if you're adding or editing content on the site, you'll likely be in this directory most of the time.

#### `_includes`

contains any helper `.liquid` templates that we use to avoid having to repeat blocks of html over and over again. any time a template uses [`{% render %}`](https://liquidjs.com/tags/render.html), it looks in this directory for the file to render.

it also contains some page or element specific `.css` files so that we don't have to author `site.css` as one gigantic file. [`site.css`](src/site.css) pulls all of those at the top of the file using [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) rules (11ty resolves the imports when it builds the site).

#### `_layouts`

contains another flavor of `.liquid` template, but these ones wrap every page to provide them common structure.

### `dist`

contains the final site built by 11ty. the one that will be deployed on the web. when the [development](#development) server is running, you can always see the final output of the site in the [`dist`](#dist) directory. it isn't checked into github.