# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
####
import { useGetProductsQuery } from "@/redux/api/baseApi";
import { addToWishlist } from "@/redux/features/wishList/wishListSlice";
import { UseAppDispatch } from "@/redux/hook";
import type { Product } from "@/types/types";
import { Button } from "../ui/button";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  const dispatch = UseAppDispatch();

  if (isLoading) return <h2 className="text-center text-xl p-5">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500 text-xl p-5">Error Occurred</h2>;

  return (
    <div className="py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-full h-52 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold line-clamp-2">
              {product.title}
            </h3>

            <p className="mt-2 text-xl font-bold text-amber-600">
              ${product.price}
            </p>

            <Button
              className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-black font-medium transition-all"
              onClick={() => dispatch(addToWishlist(product))}
            >
              ❤️ Add to Wishlist
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
