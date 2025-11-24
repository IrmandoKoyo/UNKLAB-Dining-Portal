// Definisi tipe data untuk aplikasi

export type MealType = 'Pagi' | 'Siang' | 'Sore';

export interface MenuItem {
    main: string;
    sides: string[];
    dessert?: string;
    drink?: string;
    calories: number; // Fitur tambahan info gizi
    protein: number;
}

export interface DailyMenu {
    day: string;
    date: string;
    meals: {
        pagi: MenuItem;
        siang: MenuItem;
        sore: MenuItem;
    };
}

export interface User {
    name: string;
    nim: string;
    dorm: string;
    balance: number; // Sisa poin makan (fitur tambahan)
}