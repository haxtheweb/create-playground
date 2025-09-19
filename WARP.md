# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The `create-playground` is a web component that provides an interactive browser-based playground for the HAX ecosystem. It enables users to create and experiment with both web components and HAXcms sites directly in the browser using WebContainer technology.

## Architecture

### Core Component Structure
- **Main Component**: `create-playground.js` - A Lit element extending DDDSuper that orchestrates the playground experience
- **Two Modes**: 
  - `webcomponent` mode: For creating and editing web components with live preview
  - `site` mode: For creating HAXcms sites with theme selection and recipe injection
- **WebContainer Integration**: Uses `@haxtheweb/web-container` to provide a Node.js environment in the browser

### Key Dependencies
- **DDD Design System**: `@haxtheweb/d-d-d` for consistent styling and theming
- **HAX Components**: `@haxtheweb/web-container`, `@haxtheweb/code-editor`, `@haxtheweb/rpg-character`
- **Build Tools**: Rollup with OpenWC configuration for ES modules and asset bundling

## Development Commands

### Core Development
- `npm install` - Install all dependencies (includes patch-package postinstall)
- `npm start` - Start development server with live reload
- `npm run build` - Build for production (outputs to `public/` directory)

### Testing and Analysis  
- `npm test` - Run test suite with coverage
- `npm test:watch` - Run tests in watch mode
- `npm run analyze` - Generate custom elements manifest

### Publishing
- `npm run release` - Build, version bump, tag, push, and publish to npm

## Key Implementation Details

### URL Parameter Handling
The component reads URL parameters to configure itself:
- `name` - Sets the component/site name (default: 'my-element')
- `theme` - Sets HAXcms theme for site mode (default: 'polaris-flex-theme')
- `recipe` - URL to remote recipe file for site injection

### WebContainer Lifecycle
1. Dependencies install automatically on component initialization
2. HAX CLI commands are executed based on component type:
   - Webcomponent: `hax webcomponent ${name} --y`
   - Site: `hax site ${name} --y --theme='${theme}' HAXCMS_DISABLE_JWT_CHECKS`
3. Files are dynamically managed and displayed in code editor interface

### Build Configuration
- **Rollup Config**: Bundles ES modules with asset copying for Monaco Editor, xterm, and highlightjs
- **Two Entry Points**: `index.html` (webcomponent mode) and `site.html` (site mode)  
- **Asset Management**: Static assets copied to `public/` during build

## File Structure Context

- `create-playground.js` - Main component implementation
- `index.html` - Webcomponent playground interface  
- `site.html` - Site creation interface with theme controls
- `locales/` - i18n files for multiple languages
- `test/` - Basic accessibility and functionality tests
- `rollup.config.js` - Build configuration with asset bundling

## DDD Design System Integration

The component heavily uses the DDD design system for:
- CSS custom properties for theming (`--ddd-theme-*`, `--ddd-spacing-*`)
- Typography (`--ddd-font-navigation`)
- Spacing and layout consistency
- Color theming integration

## Deployment

The project is configured for Vercel deployment with automatic builds on GitHub commits. The `vercel.json` configuration handles routing and build process.

## Internationalization

Supports multiple languages with JSON files in `/locales/` directory:
- Arabic (ar)
- Spanish (es) 
- Hindi (hi)
- Chinese (zh)

Each includes both base translations and HAX properties translations for the editor interface.