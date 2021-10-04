<p align="center"><img alt="Venture" src="https://github.com/gisabernardess/venture/blob/main/web/public/images/logo-black.svg"></p>
<p align="center">Organize your games. Play them with anyone.</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gisabernardess/venture">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gisabernardess/venture">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/gisabernardess/venture">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gisabernardess/venture">
  <img alt="Github license" src="https://img.shields.io/github/license/gisabernardess/venture">
</p>

<p align="center"><img alt="Venture" src="https://github.com/gisabernardess/venture/blob/main/.github/cover.png"></p>

<p align="center">
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project-specification">Project Specification</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>&nbsp;
</p>

## 💬 Project

Final project of the Graduate Course in Full Stack Web Development at the Pontifical Catholic University of Minas Gerais as a requirement for obtaining the graduate degree.

The search for innovation is a permanent challenge for companies that want to gain a good place in the market. In this sense, finding ways to promote discussion and the development of innovative solutions is one of the main activities that contribute to this objective. This is where Hackathons events comes in.

Hackathons events are successful in companies from different sectors, including in the current company I am part of, with the aim of exercising creativity, stimulating brainstorming, creating new projects and training employees. In one of these events, an online tabletop RPG game was developed, however it was not completely finished, lacking to create the web interface for the management of players.

Finally, the proposal for this project is the development of the web application with player management, completing the online tabletop RPG game project developed previously.

## 🚀 Technologies

Project developed with the main following technologies:

- [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)
- [React.js](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Node.js](https://nodejs.org/en/)
- [Adonis.js](https://adonisjs.com/)

## 🔖 Layout

You can view the layout of the project in the <a href="https://www.figma.com/file/n0HOpITD6ktjuBjSr5R8Eb/Venture?node-id=0%3A1" rel="nofollow">web</a> version. You need to have a <a href="https://www.figma.com/" rel="nofollow">Figma</a> account to access it.

## 🔖 Project Specification

You can view the project specification in the [EN](https://github.com/gisabernardess/venture/wiki/specification) and [PT-BR](https://github.com/gisabernardess/venture/wiki/especificacao) versions.

## ℹ️ How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Yarn](https://legacy.yarnpkg.com) and [Node.js](https://nodejs.org/en/) >= 14.16. From your command line:

```bash
# Clone the repository
$ git clone https://github.com/gisabernardess/venture.git
```

### 🖥️ Web

```bash
# Go into the repository
$ cd venture/web

# Install dependencies
$ yarn

# Run the development server
$ yarn dev

# Navigate to http://localhost:3000
# The app will automatically reload if you change any of the source files.
```

### ⚙️ Server

```bash
# Go into the repository
$ cd venture/server

# Install dependencies
$ yarn

# Start docker container for Postgres
# Create the .env file in the repository using the sample file .env.example

# Run the development server
$ yarn dev

# Run the migrations
$ node ace migration:run

# Navigate to http://localhost:3333
# The app will automatically reload if you change any of the source files.
```

## 📝 License

This project is under the MIT license. See the <a href="https://github.com/gisabernardess/venture/blob/main/LICENSE" rel="nofollow">LICENSE</a> for more information.

---

<p align="center">Made with ♥ by Gisele Silva 👋 <a href="https://www.linkedin.com/in/gisabernardess/" rel="nofollow">Get in touch!</a></p>
