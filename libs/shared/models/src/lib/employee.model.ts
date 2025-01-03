export interface Equipment {
    id: string;
    name: string;
}

export interface Employee {
    id: string;
    name: string;
    department: string;
    status: string;
    email: string;
    equipments: Equipment[];
}

export interface OffboardingRequest {
    address: {
        streetLine1: string;
        country: string;
        postalCode: string;
        receiver: string;
    };
    notes: string;
    phone: string;
    email: string;
}