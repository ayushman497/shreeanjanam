import { BRAND_INFO } from "./constants";
import { CartItem } from "@/types";

export interface SingleOrderParams {
  productName: string;
  variant: string;
  quantity: number;
  price?: number;
  deliveryArea?: string;
  notes?: string;
}

export function generateSingleOrderWhatsAppUrl(params: SingleOrderParams): string {
  const { productName, variant, quantity } = params;
  
  // Exact format requested in the prompt:
  // Hello Anjanam Foods,
  // I would like to order:
  // Product: {Product Name}
  // Size: {Variant}
  // Quantity: {Quantity}
  // Please share pricing and delivery details.
  // Thank you.

  let message = `Hello Anjanam Foods,\n\nI would like to order:\nProduct: ${productName}\nSize: ${variant}\nQuantity: ${quantity}\n`;
  
  if (params.deliveryArea && params.deliveryArea.trim()) {
    message += `Delivery Location: ${params.deliveryArea.trim()}\n`;
  }
  
  if (params.notes && params.notes.trim()) {
    message += `Notes: ${params.notes.trim()}\n`;
  }

  message += `\nPlease share pricing and delivery details.\n\nThank you.`;

  const encodedText = encodeURIComponent(message);
  const phone = BRAND_INFO.whatsappNumber;
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}&type=phone_number&app_absent=0`;
}

export function generateMultiOrderWhatsAppUrl(items: CartItem[], deliveryArea?: string, notes?: string): string {
  if (items.length === 0) {
    return generateGeneralWhatsAppUrl("Hello Anjanam Foods, I would like to inquire about your pure flours.");
  }

  if (items.length === 1) {
    return generateSingleOrderWhatsAppUrl({
      productName: items[0].product.name,
      variant: items[0].variant.size_label,
      quantity: items[0].quantity,
      price: items[0].variant.discounted_price || items[0].variant.price,
      deliveryArea,
      notes
    });
  }

  let message = `Hello Anjanam Foods,\n\nI would like to place an order for the following items:\n\n`;

  let totalEstimated = 0;
  items.forEach((item, index) => {
    const unitPrice = item.variant.discounted_price || item.variant.price || 0;
    const itemTotal = unitPrice * item.quantity;
    totalEstimated += itemTotal;

    message += `${index + 1}. *${item.product.name}*\n   Size: ${item.variant.size_label} | Qty: ${item.quantity}`;
    if (unitPrice > 0) {
      message += ` | Est: ₹${itemTotal}`;
    }
    message += `\n\n`;
  });

  if (totalEstimated > 0) {
    message += `Estimated Order Value: ₹${totalEstimated}\n`;
  }

  if (deliveryArea && deliveryArea.trim()) {
    message += `Delivery Location: ${deliveryArea.trim()}\n`;
  }

  if (notes && notes.trim()) {
    message += `Special Instructions: ${notes.trim()}\n`;
  }

  message += `Please confirm availability, final price, and Indore delivery details.\n\nThank you.`;

  const encodedText = encodeURIComponent(message);
  const phone = BRAND_INFO.whatsappNumber;
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}&type=phone_number&app_absent=0`;
}

export function generateDistributorWhatsAppUrl(data: {
  businessName: string;
  ownerName: string;
  phone: string;
  city: string;
  businessType?: string;
  estimatedVolume?: string;
}): string {
  const message = `Hello Anjanam Foods Team,\n\nI am interested in becoming a Retail / Wholesale Distributor Partner.\n\n*Partner Details:*\n- Business: ${data.businessName}\n- Contact Person: ${data.ownerName}\n- Phone: ${data.phone}\n- City/State: ${data.city}\n- Business Type: ${data.businessType || 'Retail Store'}\n- Estimated Requirement: ${data.estimatedVolume || 'Standard Wholesale'}\n\nPlease share the distributor catalog and wholesale pricing structure.\n\nThank you.`;

  const encodedText = encodeURIComponent(message);
  const phone = BRAND_INFO.whatsappNumber;
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}&type=phone_number&app_absent=0`;
}

export function generateGeneralWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = customMessage || `Hello Anjanam Foods, I would like to inquire about your Shuddh Vrat Ka Aata and grain products in Indore.`;
  const encodedText = encodeURIComponent(defaultMsg);
  const phone = BRAND_INFO.whatsappNumber;
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}&type=phone_number&app_absent=0`;
}
