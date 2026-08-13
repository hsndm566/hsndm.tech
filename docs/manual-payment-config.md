# Manual transfer configuration

The manual-transfer paywall is intentionally configured through backend environment variables. Never place the IBAN, account number, SWIFT code, admin token, or model key in frontend source, GitHub, screenshots, browser local storage, or public logs.

Use the following variable names in the protected backend environment:

```env
BANK_NAME=The Saudi National Bank
BANK_ACCOUNT_NAME=the account holder name
BANK_IBAN=the Saudi IBAN
BANK_ACCOUNT_NUMBER=the account number
BANK_SWIFT_CODE=the SWIFT/BIC code
CV_PRICE_SAR=29
ADMIN_API_TOKEN=a-long-random-private-token
CV_ORDERS_PATH=/persistent-storage/cv-orders.json
```

The backend considers the payment system ready only when the bank name, account name, Saudi IBAN, numeric account number, SWIFT/BIC code, admin token, and persistent order path are present. In production, orders are refused when persistent storage is missing or cannot be read. This prevents the system from accepting a transfer while losing the order after a restart.

The customer flow is: generate the CV, create an order, receive the protected bank instructions, submit the payer name and transfer reference, and wait for manual approval. The admin must inspect the bank account independently and approve only an order with submitted transfer details. The export endpoint remains locked until approval and sends no-store headers.

The admin routes are protected with the `x-admin-token` header. Use them from a private admin tool or server-side workflow, not from public frontend JavaScript. The service health endpoint reports readiness, bank configuration status, admin configuration status, storage configuration, storage-read errors, order count, and price, but never returns bank values or secret tokens.

If the model, storage, bank configuration, or approval configuration fails, the system fails closed: it displays a retry/support message, does not unlock an export, and does not claim that a payment was accepted.
