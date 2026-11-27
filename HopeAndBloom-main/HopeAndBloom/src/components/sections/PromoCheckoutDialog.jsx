import { useEffect, useRef, useState } from 'react';
import { recordDemoPromoNotification } from '../../data/promoNotifications.js';

export function PromoCheckoutDialog({ promo, onClose }) {
  const dialogRef = useRef(null);
  const [parentGuardianName, setParentGuardianName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [isComplete, setIsComplete] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (promo && !dialog.open) {
      setParentGuardianName('');
      setPaymentMethod('gcash');
      setIsComplete(false);
      setCheckoutError('');
      dialog.scrollTop = 0;
      dialog.showModal();
    } else if (!promo && dialog.open) {
      dialog.close();
    }
  }, [promo]);

  const closeFromBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const simulateCheckout = (event) => {
    event.preventDefault();
    try {
      recordDemoPromoNotification(promo, paymentMethod, parentGuardianName);
      setCheckoutError('');
      setIsComplete(true);
    } catch (error) {
      setCheckoutError(`Could not notify the admin: ${error.message}`);
    }
  };

  return (
    <dialog
      className="about-detail-dialog promo-checkout-dialog"
      ref={dialogRef}
      aria-labelledby="promo-checkout-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeFromBackdrop}
    >
      {promo && (
        <>
          <div className="promo-checkout-header">
            <div>
              <p className="about-detail-eyebrow">PAYMENT ENVIRONMENT · DEMO</p>
              <h2 id="promo-checkout-title">Review {promo.name}</h2>
            </div>
            <button
              className="about-detail-close"
              type="button"
              aria-label="Close demo checkout"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          <p className="about-detail-summary">
            Demo only: no payment is processed. The admin can see a test name in this browser.
          </p>

          <div className="promo-checkout-summary" role="group" aria-label="Package summary">
            <div className="promo-checkout-summary-main">
              <div>
                <strong>{promo.sessions}</strong>
                <span>{promo.count}</span>
              </div>
              <strong className="promo-checkout-price">{promo.price}</strong>
            </div>
            {(promo.bonus || promo.inclusions) && (
              <ul>
                {promo.bonus && <li>{promo.bonus}</li>}
                {promo.inclusions?.map((inclusion) => <li key={inclusion}>{inclusion}</li>)}
              </ul>
            )}
          </div>

          {isComplete ? (
            <p className="promo-checkout-status" role="status" aria-live="polite">
              Demo selection recorded for the admin dashboard in this browser. No payment was sent to PayMongo, no money was charged, and this package was not activated.
            </p>
          ) : (
            <form className="promo-checkout-form" onSubmit={simulateCheckout}>
              {checkoutError && <p className="promo-checkout-error" role="alert">{checkoutError}</p>}
              <div className="promo-checkout-fields">
                <div className="form-group">
                  <label htmlFor="promo-parent-guardian-name">Parent/guardian name</label>
                  <input
                    id="promo-parent-guardian-name"
                    name="demoParentGuardianName"
                    type="text"
                    autoComplete="off"
                    maxLength={100}
                    placeholder="Test name only"
                    value={parentGuardianName}
                    onChange={(event) => setParentGuardianName(event.target.value)}
                    aria-describedby="promo-payment-notice"
                    required
                  />
                </div>
                <div className="form-group promo-checkout-method-row">
                  <label htmlFor="promo-payment-method">Payment method preview</label>
                  <select
                    id="promo-payment-method"
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <option value="gcash">GCash</option>
                    <option value="maya">Maya</option>
                    <option value="card">Credit or debit card</option>
                  </select>
                </div>
              </div>
              <p className="promo-checkout-notice" id="promo-payment-notice" role="note">
                PayMongo is not connected. Use a test name only; it is stored in this browser.
              </p>
              <button className="btn promo-checkout-submit" type="submit">
                Simulate demo checkout · {promo.price}
              </button>
            </form>
          )}

          <a className="promo-checkout-contact" href="#contact" onClick={onClose}>
            Ask us about enrolling instead
          </a>
        </>
      )}
    </dialog>
  );
}
