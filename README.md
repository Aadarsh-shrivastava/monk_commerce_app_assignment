Here's a sample README for your Monk Commerce app assignment repository:

---

# Monk Commerce App Assignment

This project is a front-end application designed for product selection and management, built with React, TypeScript, and Vite. The app features product search, selection, variant management, and asynchronous loading with debouncing, among other functionalities. It serves as an assignment demonstration for a product picker application using a RESTful API.

## Features

### 1. Product Search and Selection
- **Search Bar with Debouncing**: Users can search products by name with an input search bar. The search bar is debounced, delaying the API call until typing has stopped for a short period to reduce redundant requests.
- **Paginated Product Loading**: Products load asynchronously and are paginated for performance. A "Load More" feature is implemented with infinite scroll to load additional products as users scroll down.

### 2. Product Variant Management
- **Product Variants Selection**: Each product has selectable variants, allowing users to choose specific options or subtypes of a product.
- **Dynamic State Management**: The selected variants are managed within the state for easy access and update during the product selection process.

### 3. UI and State Handling
- **Modal Interface**: Product selection is done within a modal that provides a clear separation of product selection from the main interface.
- **Add/Remove Products from Selection**: Users can add products to a selection list or remove them. A summary of selected products appears at the bottom of the modal.

### 4. API Integration and Proxy Handling
- **API Requests**: Fetches products using Monk Commerce's RESTful API, handling pagination and search queries.
- **Development Proxy for CORS**: Configured with Vite to use a proxy for API calls during development, addressing CORS issues.
- **Production CORS Handling**: CORS issues are handled with a CORS proxy for demonstration purposes since the backend server is not modifiable.

## Technologies Used
- **React & TypeScript**: For building the user interface and ensuring type safety across the application.
- **Vite**: For faster builds and optimized development experience.
- **Axios**: For making API requests to the backend.
- **Tailwind CSS**: For styling the components and layout with utility-first CSS.
- **CORS Anywhere (Demo)**: A temporary solution to bypass CORS restrictions in production.

## Installation and Setup

To get a local copy of the project and run it on your machine:

### Prerequisites

Ensure you have Node.js and npm installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aadarsh-shrivastava/monk_commerce_app_assignment.git
   cd monk_commerce_app_assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your API key for Monk Commerce:
   ```plaintext
   VITE_API_KEY=your_api_key
   ```

### Running the Application

#### Development
To start the application in development mode, use:
```bash
npm run dev
```
This will launch the app on `http://localhost:3000` by default. The Vite proxy will handle CORS during development.

#### Production Build
To build the application for production, use:
```bash
npm run build
```
This will create an optimized `dist` folder with all production-ready assets.

**Note**: Since CORS proxy only works in development, you may encounter CORS issues if deploying without a backend configuration.

## Usage

1. **Open the Product Picker**: Start by selecting products through the "Select Products" button.
2. **Search Products**: Use the search bar to filter products by name. Results will update after typing has stopped.
3. **Select Variants**: For each product, choose one or more variants to add to your selection.
4. **View Selected Products**: The number of selected products will display at the bottom of the modal.
5. **Add Products to List**: Click "Add" to confirm your selection or "Cancel" to exit without saving.

## Folder Structure

- **`/src`**: Contains the main application code.
  - **`components`**: UI components like `ProductPicker`, `ProductPickerItem`, and `ActivityIndicator`.
  - **`contexts`**: React contexts for managing global state.
  - **`assets`**: Contains any static files or images.
  - **`types`**: TypeScript types and interfaces for the project.

## Troubleshooting

- **CORS Issues in Production**: Since the backend API server cannot be modified to allow cross-origin requests, deploy the application using CORS Anywhere or similar services. Alternatively, consider setting up your own proxy server.
- **Debounce Function**: If the search functionality becomes unresponsive, check the `debounce` function configuration in `ProductPicker.tsx`.
- **API Key**: Ensure your `.env` file contains a valid API key to avoid authorization errors.

## Future Enhancements

- **Enhanced Error Handling**: Implement more robust error handling for API calls.
- **Pagination Controls**: Add manual pagination for improved control over product loading.
- **Backend Configuration**: Work with a backend that supports necessary CORS headers, enabling direct API calls from production environments.

## License

This project is for assignment purposes and is not licensed for production use.

---

This README provides a clear overview of the app's setup, usage, and troubleshooting information. Let me know if you'd like further customization!



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
