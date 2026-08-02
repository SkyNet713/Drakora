# Firebase Setup Guide — Reptile-Haven

## 1. Create Project (Google Account)
- Go to https://console.firebase.google.com/
- Click "Create a project" and name it (e.g., `reptile-haven`).
- Enable Google Analytics (optional) and complete setup.

## 2. Register Web App
- In Project Settings > General > Your apps, click the web icon (`</>`).
- Register app name (`reptile-haven`).
- Copy the `firebaseConfig` values into `.env.local` and Vercel Environment Variables.

## 3. Enable Services
- **Firestore Database**: Build > Firestore Database > Create database (start in test mode, then add rules).
- **Authentication**: Build > Authentication > Get started > Email/Password (enable it).

## 4. Environment Variables
### Local (`.env.local` — already created)
Fill in the values from step 2.

### Vercel (Production)
- Go to https://vercel.com > Reptile-Haven > Settings > Environment Variables.
- Add each `NEXT_PUBLIC_FIREBASE_*` variable with the same values.
- Redeploy after adding variables.

## 5. Security Rules Example (Firestore)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reptiles/{document} {
      allow read, write: if request.auth != null || true; // adjust for public/guest access
    }
  }
}
```

## 6. Auth Setup
- In Firebase Authentication > Sign-in method, enable Email/Password.
- If you want anonymous access, also enable Anonymous.
