export interface User {
    id: string; // @id @db.Uuid
    email: string; // @unique @db.VarChar(255)
    avatar?: string; // @db.VarChar(255)
    name: string; // @db.VarChar(255)
    phone?: string; // @db.VarChar(255)
    tenantId?: string; // @db.Uuid
    username: string; // @unique @db.VarChar(255)
    password: string; // @db.VarChar(255)
    isEmailVerified?: boolean; // @default(false)
    isAdminUser?: boolean; // @default(false)
    isSuperAdmin?: boolean; // @default(false)
    isDeleted?: boolean; // @default(false)
    lastLogin?: string; // @db.Timestamptz(6)
    roles?: string; // @db.VarChar(255)
    address?: any; // @db.Json
    createdAt: string; // @default(now())
    updatedAt: string; // @default(now())
  }
  export interface NewUser {
  username: string;
  email: string;
  phone?: string;
  password: string;
  name:string;
  isAdminUser?: boolean;
  address?: any;
}
  export interface UpdatedUser {
    id?: string; // @id @db.Uuid
    userId: string; // @id @db.Uuid
    email?: string; // @unique @db.VarChar(255)
    name?: string; // @db.VarChar(255)
    phone?: string; // @db.VarChar(255)
    tenantId?: string; // @db.Uuid
    username?: string; // @unique @db.VarChar(255)
    password?: string; // @db.VarChar(255)
    isEmailVerified?: boolean; // @default(false)
    isAdminUser?: boolean; // @default(false)
    isSuperAdmin?: boolean; // @default(false)
    isDeleted?: boolean; // @default(false)
    lastLogin?: string; // @db.Timestamptz(6)
    roles?: string; // @db.VarChar(255)
    address?: any; // @db.Json
    createdAt?: string; // @default(now())
    updatedAt?: string; // @default(now())
    
  }