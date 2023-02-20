# KPS Web Component Library

A collection of web components, created by King Post Studio, built with TypeScript, Lit and Vite.

## How to Install

Start by installing the package:

```bash
yarn add @kingpoststudio/web-components
```

The components are available as a module in the <code>@kingpoststudio/web-components</code> namespace. You can import them into your project using the following syntax:

```typescript
import { Button } from '@kingpoststudio/web-components';
```

## Development

#### Development in Storybook

Typically, you'll want to develop the component in Storybook. To do this, run the following commands:

```bash
yarn
yarn dev # Starts Vite
```

#### Development in HubSpot

Sometimes, you may want to develop these components directly in HubSpot, rather than in Storybook. You will need to link the component library to the HubSpot project:

```bash
cd web-components
yarn link # Creates a consumable link to the library
cd ../hubspot-theme
yarn link @kingpoststudio/web-components # Links the library to the HubSpot project
yarn dev # Starts HubSpot development
```

You can then navigate into the HubSpot project and run the standard development process. Please note, because you are not consuming a distributed version of the library, you will need to directly import the modules from the source into your HubSpot's JS file. Whenever an update is made to the library, your HubSpot project will recognize the change, rebundle and deploy. I'm sure there is a better way to manage this, but it works for now.

Example:
```typescript
/* Normally, you would import the library from the library's namespace. */
import '@kingpoststudio/web-components';

/* However, you can directly import the modules from the source. */
import '@kingpoststudio/web-components/src/index.ts';

