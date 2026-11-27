import cashPaymentLogo from '../../../images/cash-payment.png';
import landbankLogo from '../../../images/landbank-logo.webp';
import bdoLogo from '../../../images/bdo-logo.jpg';
import visaLogo from '../../../images/visa-logo.jpg';
import googlePayLogo from '../../../images/google-pay-logo.png';
import rcbcLogo from '../../../images/rcbc-logo.jpg';

export function Dialogs() {
  return (
    <>
      <dialog
        className="about-detail-dialog"
        id="about-detail-dialog"
        aria-labelledby="about-detail-title"
        aria-describedby="about-detail-summary"
      >
        <div className="about-detail-dialog-top">
          <div className="about-detail-dialog-icon" id="about-detail-icon" aria-hidden="true" />
          <button className="about-detail-close" type="button" aria-label="Close details">×</button>
        </div>
        <p className="about-detail-eyebrow" id="about-detail-eyebrow">ABOUT THE CENTER</p>
        <h2 id="about-detail-title" />
        <p className="about-detail-summary" id="about-detail-summary" />
        <div className="about-detail-content">
          <h3>What this means at Hope and Bloom</h3>
          <ul id="about-detail-points" />
        </div>
      </dialog>

      <dialog
        className="about-detail-dialog home-request-dialog"
        id="home-based-dialog"
        aria-labelledby="home-request-title"
        aria-describedby="home-request-description"
      >
        <div className="about-detail-dialog-top">
          <div className="about-detail-dialog-icon" aria-hidden="true">🏡</div>
          <button className="about-detail-close" type="button" aria-label="Close home-based request form">×</button>
        </div>
        <p className="about-detail-eyebrow">HOME-BASED ABA</p>
        <h2 id="home-request-title">Tell Us About Your Family</h2>
        <p className="about-detail-summary" id="home-request-description">
          Share a few details so we can understand your home-based support needs.
        </p>
        <form className="home-request-form" id="home-request-form">
          <div className="home-request-fields">
            <div className="form-group">
              <label htmlFor="home-guardian-name">Parent or Guardian Name</label>
              <input id="home-guardian-name" name="guardianName" autoComplete="name" required autoFocus placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="home-contact-number">Contact Number</label>
              <input id="home-contact-number" name="contactNumber" type="tel" autoComplete="tel" required placeholder="e.g. 09xx xxx xxxx" />
            </div>
            <div className="form-group">
              <label htmlFor="home-email">Email Address <span className="home-request-optional">(optional)</span></label>
              <input id="home-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="home-child-age">Child's Age</label>
              <select id="home-child-age" name="childAge" required defaultValue="">
                <option value="" disabled>Select age range</option>
                <option value="under-3">Under 3 years old</option>
                <option value="3-5">3 to 5 years old</option>
                <option value="6-12">6 to 12 years old</option>
                <option value="13-plus">13+ years old</option>
              </select>
            </div>
            <div className="form-group home-request-full">
              <label htmlFor="home-address">Home Address</label>
              <input id="home-address" name="homeAddress" autoComplete="street-address" required placeholder="Street, barangay, city" />
            </div>
            <div className="form-group home-request-full">
              <label htmlFor="home-request-notes">
                Preferred Schedule or Support Needs <span className="home-request-optional">(optional)</span>
              </label>
              <textarea id="home-request-notes" name="notes" rows="3" placeholder="Share a preferred schedule or what you hope to work on." />
            </div>
          </div>
          <p className="home-request-privacy">
            This form is a preview only. Your information will not be sent or saved because online booking is not connected yet.
          </p>
          <button className="btn home-request-submit" type="submit">
            <span>Review Request</span>
            <span className="btn-arrow">→</span>
          </button>
          <div className="home-request-status" id="home-request-status" role="status" aria-live="polite" />
        </form>
      </dialog>

      <dialog
        className="about-detail-dialog payment-dialog"
        id="payment-dialog"
        aria-labelledby="payment-title"
        aria-describedby="payment-summary"
      >
        <div className="about-detail-dialog-top">
          <button className="payment-back" type="button" aria-label="Back to payment methods" hidden>‹</button>
          <div className="about-detail-dialog-icon" aria-hidden="true">₱</div>
          <button className="about-detail-close" type="button" aria-label="Close payment options">×</button>
        </div>
        <p className="about-detail-eyebrow">SECURE ONLINE PAYMENT</p>
        <h2 id="payment-title">Choose a Payment Method</h2>
        <p className="about-detail-summary" id="payment-summary" />
        <form className="payment-form" id="payment-form">
          <div className="payment-layout">
            <div className="payment-left">
              <fieldset className="payment-methods">
                <legend>Pay with</legend>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="GCash" defaultChecked />
                  <span className="payment-option-icon payment-option-logo" aria-hidden="true">
                    <img src={googlePayLogo} alt="" />
                  </span>
                  <span><strong>GCash</strong><small>Wallet</small></span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="Credit or debit card" />
                  <span className="payment-option-icon payment-option-logo" aria-hidden="true">
                    <img src={visaLogo} alt="" />
                  </span>
                  <span><strong>Card</strong><small>Visa or Mastercard</small></span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="BDO" />
                  <span className="payment-option-icon payment-option-logo" aria-hidden="true">
                    <img src={bdoLogo} alt="" />
                  </span>
                  <span><strong>BDO</strong><small>Online banking</small></span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="RCBC" />
                  <span className="payment-option-icon payment-option-logo" aria-hidden="true">
                    <img src={rcbcLogo} alt="" />
                  </span>
                  <span><strong>RCBC</strong><small>Online banking</small></span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="LANDBANK" />
                  <span className="payment-option-icon payment-option-logo" aria-hidden="true">
                    <img src={landbankLogo} alt="" />
                  </span>
                  <span><strong>LANDBANK</strong><small>Online banking</small></span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="Cash Payment" />
                  <span className="payment-option-icon payment-option-logo" aria-hidden="true">
                    <img src={cashPaymentLogo} alt="" />
                  </span>
                  <span><strong>Cash</strong><small>Pay at the center</small></span>
                </label>
              </fieldset>
              <div className="payment-details" id="payment-details" hidden>
            <h3 className="payment-details-heading">Payment details</h3>
            <div className="payment-detail-fields payment-common-fields">
              <div className="form-group payment-detail-full">
                <label htmlFor="payment-email">Email Address</label>
                <input id="payment-email" name="paymentEmail" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <div className="form-group payment-detail-full">
                <label htmlFor="payment-address">Address</label>
                <input id="payment-address" name="paymentAddress" autoComplete="street-address" placeholder="Street, barangay, city" />
              </div>
            </div>
            <div className="payment-detail-fields payment-gcash-fields" data-payment-fields="GCash">
              <div className="form-group">
                <label htmlFor="gcash-mobile">GCash Mobile Number</label>
                <input id="gcash-mobile" name="gcashMobile" inputMode="numeric" placeholder="09xx xxx xxxx" />
              </div>
              <div className="form-group">
                <label htmlFor="gcash-name">Account Name</label>
                <input id="gcash-name" name="gcashName" placeholder="Full name" />
              </div>
            </div>
            <div className="payment-detail-fields payment-card-fields" data-payment-fields="Credit or debit card">
              <div className="form-group payment-detail-full">
                <label htmlFor="card-name">Name on Card</label>
                <input id="card-name" name="cardName" autoComplete="cc-name" placeholder="Full name" />
              </div>
              <div className="form-group payment-detail-full">
                <label htmlFor="card-number">Card Number</label>
                <input id="card-number" name="cardNumber" inputMode="numeric" autoComplete="cc-number" maxLength="19" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="form-group">
                <label htmlFor="card-expiry">Expiry Date</label>
                <input id="card-expiry" name="cardExpiry" inputMode="numeric" autoComplete="cc-exp" maxLength="5" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label htmlFor="card-cvc">CVC</label>
                <input id="card-cvc" name="cardCvc" inputMode="numeric" autoComplete="cc-csc" maxLength="4" placeholder="CVC" />
              </div>
            </div>
            <div className="payment-detail-fields payment-bank-fields" data-payment-fields="BDO RCBC LANDBANK">
              <div className="form-group payment-detail-full">
                <label htmlFor="bank-account-name">Account Name</label>
                <input id="bank-account-name" name="bankAccountName" placeholder="Full name" />
              </div>
              <div className="form-group payment-detail-full">
                <label htmlFor="bank-reference">Reference Number <span className="home-request-optional">(demo)</span></label>
                <input id="bank-reference" name="bankReference" inputMode="numeric" placeholder="Enter demo reference number" />
              </div>
            </div>
            <div className="payment-detail-fields payment-cash-fields" data-payment-fields="Cash Payment">
              <div className="form-group payment-detail-full">
                <label htmlFor="cash-name">Payer Name</label>
                <input id="cash-name" name="cashName" placeholder="Full name" />
              </div>
            </div>
              </div>
            </div>
            <aside className="payment-summary-card">
              <p className="payment-summary-label">Selected package</p>
              <h3>Therapy Sessions</h3>
              <div className="payment-summary-row">
                <span>Package total</span>
                <strong id="payment-total" />
              </div>
              <div className="payment-summary-divider" />
              <div className="payment-summary-row payment-summary-due">
                <span>Due today</span>
                <strong id="payment-due">—</strong>
              </div>
              <p className="payment-summary-note">Includes your selected session package and available free-session benefits.</p>
            </aside>
          </div>
          <p className="payment-demo-note">
            Demo checkout only. No payment information is collected or sent, and no real charge will be made.
          </p>
          <button className="btn payment-submit" type="submit">
            <span>Continue to Payment</span>
            <span className="btn-arrow">→</span>
          </button>
          <div className="payment-status" id="payment-status" role="status" aria-live="polite" />
        </form>
      </dialog>
    </>
  );
}
