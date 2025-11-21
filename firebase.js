import { initializeApp } from 'firebase/app';

export const inicializarFirebase = () => {
    const firebaseOptions = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    };

    if (Object.values(firebaseOptions).some(value => !value)) {
        console.warn('[!] Faltan variables de configuración de Firebase. No estará disponible.');
        return;
    }

    return initializeApp(firebaseOptions);
};
