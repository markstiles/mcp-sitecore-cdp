export class GuestModel {
    id: string;
    name: string;
    email: string;
    createdAt: Date;

    constructor(id: string, name: string, email: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
        };
    }
}