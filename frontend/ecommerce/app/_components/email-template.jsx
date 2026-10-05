import * as React from 'react'

export default function EmailTemplate({ firstName }) {
  return (
    <div
      style={{
        backgroundColor: '#f5f7fb',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#4F46E5',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              margin: 0,
              fontSize: '30px',
            }}
          >
            🎉 Payment Successful
          </h1>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '40px',
            color: '#333',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Hi {firstName},</h2>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '28px',
            }}
          >
            Thank you for your purchase!
          </p>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '28px',
            }}
          >
            Your payment has been received successfully, and your order is now
            being processed.
          </p>

          <div
            style={{
              margin: '35px 0',
              padding: '20px',
              background: '#EEF2FF',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                margin: 0,
                color: '#4F46E5',
              }}
            >
              ✅ Order Confirmed
            </h2>

            <p
              style={{
                marginTop: '10px',
                color: '#555',
              }}
            >
              We'll notify you when your order is ready.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="http://localhost:3000"
              style={{
                display: 'inline-block',
                background: '#4F46E5',
                color: '#fff',
                padding: '14px 30px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
            >
              Continue Shopping
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            background: '#F9FAFB',
            padding: '25px',
            textAlign: 'center',
            fontSize: '13px',
            color: '#888',
          }}
        >
          <p style={{ margin: 0 }}>Thank you for choosing our store ❤️</p>

          <p style={{ marginTop: '8px' }}>
            © 2026 E-Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
