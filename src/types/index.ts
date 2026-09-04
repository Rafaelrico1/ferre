export type ProductCategory =
  | 'Herramientas Manuales'
  | 'Herramientas Eléctricas'
  | 'Fontanería y Plomería'
  | 'Electricidad e Iluminación'
  | 'Tornillería y Fijaciones'
  | 'Pinturas y Adhesivos'
  | 'Construcción'
  | 'Seguridad Industrial';

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  description: string;
  category: ProductCategory;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  unit: 'pz' | 'kg' | 'm' | 'caja' | 'litro' | 'rollo';
  location?: string;
  image?: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number; // percentage 0 - 100
  subtotal: number;
}

export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'qr_digital';

export interface PaymentDetails {
  method: PaymentMethod;
  amountReceived?: number;
  change?: number;
  cardLast4?: string;
  cardBrand?: string;
  authCode?: string;
  referenceNumber?: string;
  status: 'approved' | 'pending' | 'rejected';
  gatewayName: 'MercadoPago POS' | 'Stripe Gateway' | 'Caja Central' | 'SPEI Banco';
}

export interface CustomerTaxData {
  name: string;
  taxId: string; // RFC / NIF / RUT / CIF
  email: string;
  phone: string;
  address: string;
  fiscalRegime: string;
  cfdiUse: string;
}

export interface InvoiceItem {
  sku: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. FAC-2026-0042
  fiscalUuid: string; // UUID digital SAT timbre
  digitalStamp: string;
  createdAt: string;
  customer: CustomerTaxData;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number; // 0.16 by default
  taxAmount: number;
  discountTotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentDetails: PaymentDetails;
  status: 'issued' | 'cancelled';
  qrCodeData: string;
  orderId?: string;
}

export type WhatsAppOrderStatus = 
  | 'nuevo'
  | 'en_preparacion'
  | 'listo_entrega'
  | 'entregado'
  | 'cancelado';

export interface WhatsAppOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  total: number;
  status: WhatsAppOrderStatus;
  source: 'whatsapp';
  notes?: string;
  createdAt: string;
  confirmationSent: boolean;
  confirmationSentAt?: string;
  invoiceId?: string;
}

export interface MessageLog {
  id: string;
  recipientPhone: string;
  recipientName: string;
  orderId?: string;
  invoiceNumber?: string;
  messageType: 'confirmacion_pedido' | 'pedido_en_camino' | 'factura_emitida' | 'alerta_pago';
  channel: 'WhatsApp' | 'SMS Pasarela';
  content: string;
  sentAt: string;
  status: 'enviado' | 'entregado' | 'leido';
}

export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  severity: 'critico' | 'bajo';
  createdAt: string;
  read: boolean;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'stock' | 'order' | 'invoice' | 'payment';
  linkTab?: string;
  timestamp: string;
  read: boolean;
}
