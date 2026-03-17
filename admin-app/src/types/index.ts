export interface Store { id: number; name: string; code: string; address: string; }
export interface Room { id: number; roomNumber: string; storeId: number; active: boolean; }
export interface RoomSession { id: number; roomId: number; expiresAt: string; active: boolean; }
export interface Order { id: number; roomId: number; totalAmount: number; status: string; createdAt: string; items: OrderItem[]; }
export interface OrderItem { id: number; menuName: string; quantity: number; unitPrice: number; }
export interface OrderHistory { id: number; roomId: number; totalAmount: number; completedAt: string; items: OrderItem[]; }
export interface Menu { id: number; name: string; price: number; description: string; imageUrl: string; categoryId: number; storeId: number; displayOrder: number; }
export interface Category { id: number; name: string; storeId: number; }
export interface CallRequest { id: number; roomId: number; reason: string; status: string; createdAt: string; }
export interface Report { id: number; reporterRoomId: number; targetRoomId: number; targetType: string; reason: string; status: string; createdAt: string; }
export interface ApiResponse<T> { success: boolean; message: string; data: T; }
