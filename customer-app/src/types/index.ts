export interface Category { id: number; name: string; storeId: number; }
export interface Menu { id: number; name: string; price: number; description: string; imageUrl: string; categoryId: number; storeId: number; displayOrder: number; }
export interface CartItem { menu: Menu; quantity: number; }
export interface Order { id: number; roomId: number; sessionId: number; totalAmount: number; status: string; createdAt: string; items: OrderItem[]; }
export interface OrderItem { id: number; menuName: string; quantity: number; unitPrice: number; }
export interface RoomTime { roomId: number; expiresAt: string; remainingMinutes: number; }
export interface SendMenuRequest { id: number; senderRoomId: number; targetRoomId: number; status: string; }
export interface MergeRequest { id: number; requesterRoomId: number; targetRoomId: number; status: string; freeExtensionUsed: boolean; }
export interface GameQuestion { id: number; type: string; category: string; content: string; optionA: string; optionB: string; }
export interface ApiResponse<T> { success: boolean; message: string; data: T; }
export interface WsNotification { type: string; [key: string]: unknown; }
