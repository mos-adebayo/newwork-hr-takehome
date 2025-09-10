# NEWWORK HR Take Home Assignment

Single page app built with React, Vite and Tailwind. It demonstrates role-based access to an employee profile, peer feedback with AI polishing, and absence requests.

## Run locally

1. Ensure Node 18 or newer.
2. Install dependencies
   ```sh
   npm install
   ```
3. Start dev server
   ```sh
   npm run dev
   ```

This demo uses in-memory to save changes made to data. 
Replace functions in `src/api.ts` with real backend endpoints. The `polishFeedback` function should call a backend route that proxies a HuggingFace text model for free-tier usage.

## Architecture notes

- Vite React TypeScript for speed and DX
- Tailwind for utility-first styling
- Simple session stored role for access control
- API layer isolated in `src/api` to swap mocks for real endpoints


## Routes
    - `/login` - To pick a role to simulate
    - `/` -  Shows profile and feedback
    - `/absences` - Handles absence requests

## Next steps with more time

- Add the backend service to handle APIs 
- Add real authentication and sessions
- Add a backend route that is proxy to HuggingFace Inference API for more secure integration 
- Handle error from APIs / third-party
- Add tests with Vitest and React Testing Library
- Add manager views to review and approve absences
