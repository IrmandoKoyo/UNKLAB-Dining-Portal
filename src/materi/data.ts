import type { DailyMenu } from '../types';

// Helper to get dates for the current week (Sunday to Saturday)
const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = today.getDate() - day; // Adjust to start from Sunday

    const sunday = new Date(today.setDate(diff));
    const dates = [];

    for (let i = 0; i < 7; i++) {
        const nextDate = new Date(sunday);
        nextDate.setDate(sunday.getDate() + i);

        // Format: "17 Nov 2025"
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        dates.push(nextDate.toLocaleDateString('id-ID', options));
    }
    return dates;
};

const weekDates = getWeekDates();

export const MOCK_USER = {
    name: "Fern Wallace",
    nim: "105084882884",
    dorm: "Crystal",
    email: "s2200666@student.unklab.ac.id",
    phone: "0812-3456-7890",
    balance: 1250,
    profileImage: "https://ui-avatars.com/api/?name=Irmando+Koyo&background=f59e0b&color=fff"
};

export const MENU_DATA: DailyMenu[] = [
    {
        day: 'Minggu',
        date: weekDates[0],
        meals: {
            pagi: {
                main: 'Nasi Goreng',
                sides: ['Telur Dadar', 'Kerupuk'],
                calories: 500,
                protein: 15
            },
            siang: {
                main: 'Ayam Kecap',
                sides: ['Sayur Sop', 'Tempe Goreng'],
                dessert: 'Puding Coklat',
                calories: 700,
                protein: 25
            },
            sore: {
                main: 'Mie Kuah',
                sides: ['Sosis Goreng', 'Sayur Sawi'],
                dessert: 'Buah Jeruk',
                calories: 450,
                protein: 12
            }
        }
    },
    {
        day: 'Senin',
        date: weekDates[1],
        meals: {
            pagi: {
                main: 'Soup Laksa Hongkong',
                sides: ['V. Sambiki', 'Sambal', 'Roti Goreng'],
                calories: 450,
                protein: 12
            },
            siang: {
                main: 'Kangkung Tumis',
                sides: ['Telur Mata Sapi', 'Sambal'],
                dessert: 'Es Cincau',
                calories: 600,
                protein: 20
            },
            sore: {
                main: 'Sayur Santan',
                sides: ['Tahu Kecap', 'Sambal'],
                dessert: 'Semangka',
                calories: 500,
                protein: 15
            }
        }
    },
    {
        day: 'Selasa',
        date: weekDates[2],
        meals: {
            pagi: {
                main: 'Soup Makaroni',
                sides: ['Terong Saos Telur', 'Roti Oles Meses'],
                calories: 420,
                protein: 10
            },
            siang: {
                main: 'Sayur Campur',
                sides: ['Tempe Tinorangsak', 'Sambal'],
                dessert: 'Brudel Sambiki',
                calories: 650,
                protein: 18
            },
            sore: {
                main: 'Kuah Gedi',
                sides: ['V. Jagung', 'Dabu-dabu', 'Pisang Gapi'],
                calories: 550,
                protein: 14
            }
        }
    },
    {
        day: 'Rabu',
        date: weekDates[3],
        meals: {
            pagi: {
                main: 'Soup Kacang Ijo',
                sides: ['Scramble Makaroni', 'Pisang Goreng'],
                calories: 480,
                protein: 14
            },
            siang: {
                main: 'Cap-Cae',
                sides: ['Gluten Sate Pedis', 'Fluid Salad'],
                calories: 580,
                protein: 22
            },
            sore: {
                main: 'Mie Goreng',
                sides: ['Tahu Saos', 'Sambal Kecap'],
                dessert: 'Semangka',
                calories: 700,
                protein: 16
            }
        }
    },
    {
        day: 'Kamis',
        date: weekDates[4],
        meals: {
            pagi: {
                main: 'Bubur Manado',
                sides: ['Ikan Asin', 'Tahu Goreng'],
                calories: 400,
                protein: 12
            },
            siang: {
                main: 'Soto Ayam',
                sides: ['Perkedel Jagung', 'Sambal'],
                dessert: 'Es Buah',
                calories: 600,
                protein: 20
            },
            sore: {
                main: 'Nasi Kuning',
                sides: ['Abon Ikan', 'Telur Iris'],
                dessert: 'Pisang',
                calories: 550,
                protein: 15
            }
        }
    },
    {
        day: 'Jumat',
        date: weekDates[5],
        meals: {
            pagi: {
                main: 'Roti Bakar',
                sides: ['Selai Kacang', 'Telur Rebus'],
                calories: 350,
                protein: 10
            },
            siang: {
                main: 'Gado-Gado',
                sides: ['Kerupuk', 'Telur Rebus'],
                dessert: 'Es Kelapa Muda',
                calories: 500,
                protein: 18
            },
            sore: {
                main: 'Sate Ayam',
                sides: ['Lontong', 'Bumbu Kacang'],
                dessert: 'Melon',
                calories: 600,
                protein: 25
            }
        }
    },
    {
        day: 'Sabtu',
        date: weekDates[6],
        meals: {
            pagi: {
                main: 'Pancake',
                sides: ['Madu', 'Buah Potong'],
                calories: 400,
                protein: 8
            },
            siang: {
                main: 'Spaghetti Bolognese',
                sides: ['Garlic Bread', 'Salad'],
                dessert: 'Es Krim',
                calories: 700,
                protein: 20
            },
            sore: {
                main: 'Pizza',
                sides: ['Kentang Goreng', 'Saus Sambal'],
                dessert: 'Minuman Soda',
                calories: 800,
                protein: 18
            }
        }
    }
];
