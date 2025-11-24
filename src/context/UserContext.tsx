import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_USER } from '../materi/data';

interface UserData {
    name: string;
    nim: string;
    dorm: string;
    email: string;
    phone: string;
    balance: number;
    profileImage: string;
}

interface UserContextType {
    user: UserData;
    updateUser: (data: Partial<UserData>) => void;
    updateProfileImage: (url: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData>({
        ...MOCK_USER,
        profileImage: `https://ui-avatars.com/api/?name=${MOCK_USER.name}&background=f59e0b&color=fff`
    });

    const updateUser = (data: Partial<UserData>) => {
        setUser(prev => ({ ...prev, ...data }));
    };

    const updateProfileImage = (url: string) => {
        setUser(prev => ({ ...prev, profileImage: url }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, updateProfileImage }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
