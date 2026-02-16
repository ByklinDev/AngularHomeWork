type User = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

type UserRole =  'admin' | 'user' | 'guest';

type PublicUser = { [P in keyof User as Exclude<P, "email">]: User[P]; };

type AllOptionalExceptId<T, K extends keyof T> = Required<Pick<T, K>> & { [P in keyof T as Exclude<P, K>]+?: T[P]; };

type UserUpdatePayload = AllOptionalExceptId<User, "id">;

type Nullable<T> = { [P in keyof T]: T[P] | null };

type NullableUser = Nullable<User>;
