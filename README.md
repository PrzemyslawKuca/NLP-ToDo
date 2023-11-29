# Advanced To-Do List with Voice Command Interpretation

## Description

This project is a state-of-the-art task management (todo list) application that uses advanced technologies to analyze and execute commands based on an uploaded voice message. The user can send an audio message, which is then analyzed by the GPT model, returning JSON with instructions. Based on this, the application performs appropriate operations, such as transferring data.

## Technologies

- **Vite**: A fast tool for building front-end applications
- **React**: JavaScript library for building user interfaces
- **GPT**: Advanced language models for natural language processing
- **make.com (formerly Integromat)**: No-code tool for process automation

## Preview

## How to run

To run this project, you must have `Node.js` and `npm` (Node Package Manager) installed. The project is built using Vite, which is a modern tool for building frontend applications, and React, a popular JavaScript library for creating user interfaces.

### Step 1: Cloning the repository

The first step is to clone the project repository to your local environment. You can do this with the following command in terminal:

```bash
git clone https://github.com/PrzemyslawKuca/ToDo-GPT.git
```

### Step 2: Installing dependencies

After cloning the repository, navigate to the project folder and install the required dependencies using npm:

```bash
cd ToDo-GPT
npm install
```

### Step 3: Start the development server

Vite offers a high-speed developer server with Hot Module Replacement (HMR) functionality. To start the development server, use the following command:

```bash
npm run dev
```

The server will be started and the application will be available at `http://localhost:3000` in your web browser (unless you have configured a different port).

### Step 4: Building the application for production

To build the application for the production environment, use the command:

```bash
npm run build
```

This command will generate optimized static files ready for deployment to the production server.

#### Additional information

- Make sure your development environment meets the required versions of `Node.js` and `npm`.
- You can customize Vite and React configuration according to your project needs by editing the `vite.config.js` file and corresponding React configuration files.
- Check the Vite and React documentation for more detailed information.

## Importing a Template into make.com

### Step 1: Selecting a Template

Before starting, you need to select a template from the `/make.com` directory.

### Step 2: Logging into your make.com account.

To import a template, you must be logged into your make.com account. If you don't already have an account, you can easily create one on the make.com website.

### Step 3: Importing the Template

Once you have logged in and selected a template, click the "Import" or "Use this template" button. The template will be added to your dashboard in make.com.

### Step 4: Configure the Template.

Once the template has been imported, you may need to make additional configurations to tailor it to the specifics of your project. This may include configuring connections to external services like GPT, parameter settings and customizing data flow logic.

### Step 5: Running Automation

Once everything is configured, you can run the automation. make.com will allow you to monitor the performance of the automation and provide information about any errors or warnings.

#### Additional information

- Read the make.com documentation to better understand how to use the tool to its full potential.
