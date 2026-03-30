import React from 'react';

export const FOOTER_LINKS = [
  {
    title: 'Help',
    links: ['Request delivery change', 'Contact & FAQs', 'Finance options', 'My Account']
  },
  {
    title: 'About',
    links: ['About us', 'Our impact', 'Innovation', 'Trade & Commercial', 'Koala Second Home', 'Koala Showroom', 'Careers', { label: 'press@koala.com', url: 'mailto:press@koala.com' }]
  },
  {
    title: 'Resources',
    links: ['Delivery', '120 day trial', 'Warranty', 'Treetops blog', 'Refer a friend', 'Compare Koala', 'Student discount']
  },
  {
    title: 'Shop',
    links: ['Mattresses', 'Sofa Beds', 'Sofas', 'Bedroom', 'Living Room', 'Outdoor', { label: 'Koala x Bluey Playtime Collection', className: 'leading-snug block' }]
  }
];

export const LEGAL_LINKS = ['Privacy Policy', 'Website Terms', 'Terms of Service', 'Promotion Terms'];

export const PAYMENT_METHODS = [
  { id: 'paypal', classes: 'bg-white text-blue-800 text-[8px]', content: 'PayPal' },
  { id: 'visa', classes: 'bg-white text-blue-900 text-[9px] italic', content: 'VISA' },
  { id: 'mastercard', classes: 'bg-white', content: <><div className="w-3 h-3 bg-red-500 rounded-full opacity-90 -mr-1" /><div className="w-3 h-3 bg-yellow-400 rounded-full opacity-90" /></> },
  { id: 'amex', classes: 'bg-blue-500 text-white text-[8px] border border-white/20', content: 'AMEX' },
  { id: 'afterpay', classes: 'bg-[#b2fce4] text-black text-[10px]', content: '~' },
  { id: 'zip', classes: 'bg-white text-indigo-900 text-[10px] italic pr-1', content: 'zip' }
];