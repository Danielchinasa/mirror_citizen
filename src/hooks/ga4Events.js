// GA4 event tracking utility for custom events
export function trackGA4Event(eventName, eventParams = {}) {
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

// Example usage (remove or comment out in production):
// trackGA4Event('view_profile', { profile_id: '123', profile_name: 'John Doe' });
// trackGA4Event('select_profile', { profile_id: '123' });
// trackGA4Event('sign_up', { method: 'email' });
// trackGA4Event('login', { method: 'email' });
// trackGA4Event('begin_checkout', { items: [{ id: '123', name: 'Profile' }] });
// trackGA4Event('add_payment_info', { payment_type: 'Paystack' });
// trackGA4Event('purchase', { transaction_id: 'TXN123456', value: 100, currency: 'NGN', items: [{ id: '123', name: 'Profile' }] });
// trackGA4Event('check_completed', { profile_id: '123', result: 'success' });
