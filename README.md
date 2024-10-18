[![Pre-release](https://img.shields.io/badge/release-v0.1.0--alpha-orange)](https://github.com/CSEN-SCU/csen-174-f24-project-zenior/releases)
[![License Badge](https://img.shields.io/github/license/CSEN-SCU/csen-174-f24-project-zenior)](https://github.com/CSEN-SCU/csen-174-f24-project-zenior/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/CSEN-SCU/csen-174-f24-project-zenior)](https://github.com/CSEN-SCU/csen-174-f24-project-zenior/commits)
&nbsp; &nbsp; &nbsp;
![Next.js](https://img.shields.io/badge/Next.js-12.0.7-blue)
![Prisma](https://img.shields.io/badge/Prisma-2.0-blue)
[![Contributors](https://img.shields.io/github/contributors/CSEN-SCU/csen-174-f24-project-zenior)](https://github.com/CSEN-SCU/csen-174-f24-project-zenior/graphs/contributors)

---

<p align="center">
  <img src="./public/images/Logo.png" alt="Zeinor Logo" width="1000" style="border-radius: 20px;">
</p>

# Zeinor

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

### Get Environment Variables:

Get `.env` file from project google drive and put it in the root of the project (next to `package.json`).

### Install dependencies:

```bash
npm install
```

### Generate Prisma Client:

```bash
npx prisma generate
```

### Run the development server:

```bash
npm run dev
```

### (Optional) Run Prisma studio server to visualy work with the database:

```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about the technology used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Docs](https://react.dev/) - React documentation with examples and refferences.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn how to use Tailwind utility classes.
- [Prisma Documentation](https://www.prisma.io/docs/orm) - learn about Prisma ORM.
- [Shadcn/ui Documentation](https://ui.shadcn.com/docs) - learn about Shadcn/ui components and examples.

## PlantUML - For Diagrams

The "diagrams" folder will be to hold diagrams that may change over time. Check out [PlantUML](https://plantuml.com/).  
You can generate the images directly with the VS Code extension called "PlantUML." Go to settings and find Plantuml: Server and make sure it is set to "https://www.plantuml.com/plantuml",
also ensure that **PlantUML: Render** is set to **PlantUML Server**. To do this, go to settings, search for **PlantUML: Render**, and choose **PlantUML Server** from the dropdown.
You need also need **Java** installed on your system for PlantUML to work. 

To preview a diagram, use the command palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on Mac), type **"PlantUML: Preview Current Diagram"**, and select it.  
To save a diagram as an image, use **"PlantUML: Save Current Diagram As..."** and choose the image format you prefer.

Here, to ensure all generated diagrams are saved in the correct location, set **PlantUML: Export Out Dir** in VS Code settings to `./diagrams/images`. This will automatically save all exported images to the `diagrams/images` folder, keeping them organized.

Optional, but to set the Diagrams Root, go to settings, search for **PlantUML: Diagrams Root**, and set it to the folder where you store your diagrams (e.g., `./diagrams`).

To create C4 model diagrams, you can use the [C4-PlantUML library](https://github.com/plantuml-stdlib/C4-PlantUML). Clone or download the repository, and include it in your diagram with `!includeC4_Container.puml`  to access the C4 elements. In this repository, we use the always up-to-date version of the C4-PlantUML library directly from GitHub. To use it in your PlantUML diagrams, simply include the following line at the top of your `.puml` file: `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml`. This ensures that you always have the latest version of the library without needing to manage any files locally.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
