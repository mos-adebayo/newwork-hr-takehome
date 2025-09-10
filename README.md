# NEWWORK Take Home Assignment

Single page app built with React, Vite and Tailwind. It demonstrates role-based access to an employee profile, peer feedback with AI polishing, and absence requests.

## Create ENV variable
Ensure to create `.env.development` using `.env.sample` file as a reference.
(This could not be avoided for this demo because HuggingFace invalidates token if it is accessible publicly.)

## Run locally

1. Ensure Node 20.19+ or newer.
2. Install dependencies
   ```sh
   npm install
   ```
3. Start dev server
   ```sh
   npm run dev
   ```

This demo uses in-memory to save changes made to data. 

## Architecture notes

- Vite with React and TypeScript for speed and developer experience
- Tailwind for utility-first styling
- OpenAI via Huggingface to refine feedback into a professional tone
- React Hook Form for minimal re-renders and efficient form handling
- Session-stored role for simple access control
- Route-based layout component for centralized screen management
- API layer isolated in src/api to swap between mocks and real endpoints
- Hugging face token will be shared in email

## Routes
    - `/login` - To pick a role to simulate
    - `/` -  Shows profile and feedback
    - `/absences` - Handles absence requests

## Next steps with more time

- Implement a backend service to handle APIs
- Add real authentication and session management
- Create a backend route as a proxy to the HuggingFace Inference API for secure integration
- Handle errors from APIs and third-party services
- Add tests using Vitest and React Testing Library
- Develop manager view for approving absences
