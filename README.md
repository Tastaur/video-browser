Installation:

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone
   ```

2. Install pnpm globally:
    ```bash
    npm install -g pnpm
    ```

3. Install project dependencies:
    ```bash
    pnpm install
    ```

4. Run the project:
    ```bash
    pnpm run dev
    ```

5. Component tests:
    ```bash
    pnpm test
    ```

6. E2E tests:
    ```bash
    pnpm test:e2e
    ```


## Explanation of solutions:

1) Added routing with filter state stored in URL query parameters. This is a good UX practice - it allows users to save/share links to filtered content.

2) Added virtualization: one of the solutions to the problem of the browser having to load and render 500 cards with images at once, which is a heavy load on the browser. Another alternative could be pagination.
