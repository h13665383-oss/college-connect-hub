import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  studentId?: string;
  employeeId?: string;
  passwordHash: string;
};

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem('college_portal_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setUsers(users: StoredUser[]) {
  localStorage.setItem('college_portal_users', JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('college_portal_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string, role: UserRole) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    let final: StoredUser;
    if (!found) {
      if (role !== 'student' && role !== 'teacher') {
        throw new Error('Only students or teachers can login.');
      }
      const passwordHash = await hashPassword(password || '');
      final = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role,
        department: 'General',
        studentId: role === 'student' ? `STU${Date.now().toString().slice(-6)}` : undefined,
        employeeId: role === 'teacher' ? `EMP${Date.now().toString().slice(-6)}` : undefined,
        passwordHash,
      };
      setUsers([...users, final]);
    } else {
      if (found.role !== 'student' && found.role !== 'teacher') {
        throw new Error('Only students or teachers can login.');
      }
      final = found;
    }
    const loggedInUser: User = {
      id: final.id,
      name: final.name,
      email: final.email,
      role: final.role,
      department: final.department,
      studentId: final.studentId,
      employeeId: final.employeeId,
    };
    setUser(loggedInUser);
    localStorage.setItem('college_portal_user', JSON.stringify(loggedInUser));
  };

  const signup = async (data: SignupData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!data.name || !data.email || !data.password || !data.role) {
      throw new Error('All fields are required.');
    }
    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      throw new Error('Email already exists. Please login.');
    }
    const passwordHash = await hashPassword(data.password);
    const newUser: StoredUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      studentId: data.role === 'student' ? `STU${Date.now().toString().slice(-6)}` : undefined,
      employeeId: data.role === 'teacher' ? `EMP${Date.now().toString().slice(-6)}` : undefined,
      passwordHash,
    };
    const updated = [...users, newUser];
    setUsers(updated);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('college_portal_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
