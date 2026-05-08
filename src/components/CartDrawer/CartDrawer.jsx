import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Trash2, ArrowLeft, CreditCard, CheckCircle, Loader2, Lock, Smartphone, Landmark, Mail, MessageSquare } from "lucide-react";
import axios from "axios";
import API_URL from "../../../Api_path";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const [suggestions, setSuggestions] = useState([]);
  
  // 'cart' | 'checkout' | 'processing_otp' | 'otp' | 'verifying' | 'success'
  const [viewState, setViewState] = useState('cart'); 
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Form & OTP States
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);

  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  useEffect(() => {
    axios.get(`${API_URL}/cartSuggestions`)
      .then((res) => setSuggestions(res.data))
      .catch((err) => console.error("Error fetching cart suggestions:", err));
  }, []);

  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => {
        setViewState('cart');
        setPaymentMethod('card');
        setOtpInput('');
        setOtpError(false);
      }, 300);
    }
  }, [isCartOpen]);

  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    if (imgString.startsWith('http')) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  // STEP 1: Submit Details -> Trigger "Send OTP" Simulation
  const handleRequestOTP = (e) => {
    e.preventDefault(); 
    setViewState('processing_otp');

    // Simulate contacting backend to send SMS/Email
    setTimeout(() => {
      setViewState('otp');
    }, 1500);
  };

  // STEP 2: Verify OTP -> Complete Payment
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setOtpError(false);
    
    // FOR TESTING: The dummy OTP is "1234"
    if (otpInput === '1234') {
      setViewState('verifying');
      
      // Simulate final payment processing and receipt sending
      setTimeout(() => {
        setViewState('success');
        clearCart(); 
        
        setTimeout(() => {
          setIsCartOpen(false);
        }, 3000);
      }, 2000);
    } else {
      setOtpError(true);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#f8f8f6] z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5] bg-white">
          <div className="flex items-center gap-3">
            {viewState === 'checkout' && (
              <button onClick={() => setViewState('cart')} className="p-1 hover:bg-gray-100 rounded-full transition">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}
            {viewState === 'otp' && (
              <button onClick={() => setViewState('checkout')} className="p-1 hover:bg-gray-100 rounded-full transition">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}
            <h2 className="text-[20px] font-bold text-[#2f2e2a]">
              {viewState === 'cart' && (cart.length === 0 ? "Your Cart is Empty" : "Your Cart")}
              {viewState === 'checkout' && "Secure Checkout"}
              {viewState === 'processing_otp' && "Sending OTP..."}
              {viewState === 'otp' && "Verification"}
              {(viewState === 'verifying' || viewState === 'success') && "Processing Payment"}
            </h2>
          </div>
          
          <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-gray-200 rounded-full transition text-gray-500 hover:text-gray-800">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* ------------------------------- */}
        {/* VIEW 1: THE CART                */}
        {/* ------------------------------- */}
        {viewState === 'cart' && (
           <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-2">
                  {suggestions.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3 group cursor-pointer">
                      <div className="w-full aspect-[4/3] bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 shadow-sm border border-gray-100">
                        <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#2f2e2a] text-center">{item.title}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover p-2" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-[14px] font-bold text-[#2f2e2a] leading-tight pr-2">{item.title}</h3>
                          <button onClick={() => removeFromCart(item.id, item.colorHex)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-1">Colour: {item.colorName}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
                          <button onClick={() => updateQuantity(item.id, item.colorHex, -1)} className="px-2 py-1 hover:bg-gray-50"><Minus size={12}/></button>
                          <span className="px-2 text-[13px] font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.colorHex, 1)} className="px-2 py-1 hover:bg-gray-50"><Plus size={12}/></button>
                        </div>
                        <span className="font-bold text-[#2f2e2a] text-[15px]">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
        )}
        
        {viewState === 'cart' && cart.length > 0 && (
          <div className="p-6 border-t border-[#e5e5e5] bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[16px] font-bold text-[#2f2e2a]">Subtotal</span>
              <span className="text-[20px] font-bold text-[#2f2e2a]">${cartTotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => setViewState('checkout')}
              className="w-full flex items-center justify-center gap-2 bg-[#6e7464] text-white font-bold text-[16px] py-4 rounded-full hover:bg-[#5a5f52] transition-colors shadow-md"
            >
              <Lock size={18} /> Checkout safely
            </button>
          </div>
        )}

        {/* ------------------------------- */}
        {/* VIEW 2: CHECKOUT FORM           */}
        {/* ------------------------------- */}
        {viewState === 'checkout' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
            <form onSubmit={handleRequestOTP} className="flex flex-col flex-1 gap-5">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email for Receipt</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-[#6e7464] focus:ring-1 focus:ring-[#6e7464]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mobile for OTP</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 99999 99999" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-[#6e7464] focus:ring-1 focus:ring-[#6e7464]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'card' ? 'border-[#6e7464] bg-[#f0f4eb] text-[#6e7464]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <CreditCard size={24} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Card</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('upi')} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'upi' ? 'border-[#6e7464] bg-[#f0f4eb] text-[#6e7464]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <Smartphone size={24} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">UPI / GPay</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('netbanking')} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${paymentMethod === 'netbanking' ? 'border-[#6e7464] bg-[#f0f4eb] text-[#6e7464]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    <Landmark size={24} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Banking</span>
                  </button>
                </div>
              </div>

              {/* Minimal Dummy Inputs just to fill space visually */}
              {paymentMethod === 'card' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Card Information</label>
                  <input type="text" required maxLength="19" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded-md p-3 outline-none" />
                </div>
              )}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Enter UPI ID</label>
                  <input type="text" required placeholder="username@okhdfcbank" className="w-full border border-gray-300 rounded-md p-3 outline-none" />
                </div>
              )}

              <div className="mt-auto border-t border-gray-200 pt-6">
                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[#2f2e2a] text-white font-bold text-[16px] py-4 rounded-md hover:bg-black transition-colors shadow-md">
                  <MessageSquare size={18} /> Send OTP & Pay ${cartTotal.toLocaleString()}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------- */}
        {/* VIEW 3: OTP VERIFICATION        */}
        {/* ------------------------------- */}
        {viewState === 'otp' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white animate-in fade-in duration-300">
            <div className="flex flex-col items-center text-center mt-10 mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Verify your Payment</h3>
              <p className="text-sm text-gray-500">We've sent a one-time password to <br/><span className="font-bold text-gray-800">{phone || 'your mobile'}</span></p>
              <p className="text-xs text-blue-600 mt-2 font-bold bg-blue-50 px-3 py-1 rounded-full">For testing, type: 1234</p>
            </div>

            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6 w-full max-w-xs mx-auto">
              <div>
                <input 
                  type="text" 
                  maxLength="4" 
                  required 
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  placeholder="• • • •" 
                  className={`w-full text-center text-3xl tracking-[1em] border-b-2 bg-transparent p-3 outline-none transition-colors ${otpError ? 'border-red-500 text-red-500' : 'border-gray-300 focus:border-[#6e7464]'}`} 
                />
                {otpError && <p className="text-red-500 text-xs text-center mt-2 font-bold">Invalid OTP. Please try "1234".</p>}
              </div>

              <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[#6e7464] text-white font-bold text-[16px] py-4 rounded-md hover:bg-[#5a5f52] transition-colors shadow-md mt-4">
                Verify & Complete Order
              </button>
            </form>
          </div>
        )}

        {/* ------------------------------- */}
        {/* VIEW 4: PROCESSING & SUCCESS    */}
        {/* ------------------------------- */}
        {(viewState === 'processing_otp' || viewState === 'verifying' || viewState === 'success') && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
            {viewState === 'processing_otp' && (
              <div className="flex flex-col items-center gap-4 text-blue-600">
                <Loader2 size={64} className="animate-spin" />
                <h3 className="text-xl font-bold text-gray-800">Sending OTP...</h3>
              </div>
            )}
            
            {viewState === 'verifying' && (
              <div className="flex flex-col items-center gap-4 text-[#6e7464]">
                <Loader2 size={64} className="animate-spin" />
                <h3 className="text-xl font-bold text-gray-800">Verifying Payment...</h3>
                <p className="text-gray-500 text-center">Do not close this window.</p>
              </div>
            )}

            {viewState === 'success' && (
              <div className="flex flex-col items-center gap-4 text-green-600 animate-in fade-in zoom-in duration-500">
                <CheckCircle size={80} />
                <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
                <p className="text-gray-500 text-center">Receipt sent to <b>{email}</b><br/>Order updates sent to <b>{phone}</b></p>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}