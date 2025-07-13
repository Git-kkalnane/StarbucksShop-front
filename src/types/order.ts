export interface Store {
    id: number;
    name: string;
    // 필요한 경우 추가 필드 정의
}

export interface Member {
    id: number;
    name: string;
}

export interface ItemOption {
    id: number;
    syrupName: string;
    isRequired: boolean;
    displayOrder: number;
    additionalPrice: number;
    quantity: number;
}

export interface OrderItem {
    id: number;
    itemName: string;
    orderItemQuantity: number;
    itemPrice: number;
    finalPrice: number;
    options?: ItemOption[];
}

export type OrderStatus = 'PLACED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
export type PickupType = 'IN_STORE' | 'TAKEOUT' | 'DELIVERY';

export interface Order {
    id: number;
    orderNumber: number;
    orderTotalPrice: number;
    orderStatus: OrderStatus;
    pickupType: PickupType;
    orderRequestMemo?: string;
    orderExpectedPickupTime: number;
    store: Store;
    member: Member;
    orderItems: OrderItem[];
}
