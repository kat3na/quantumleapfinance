// sellStock.tsx

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import styles from './SellStock.module.css';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zlueetvjllugrwexfxqr.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWVldHZqbGx1Z3J3ZXhmeHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDIyNzg0OCwiZXhwIjoyMDU5ODAzODQ4fQ.jVKaOvAahQQGIiUkZPHns8nHyOu69w7RUOOW3fnyGJM'
)
const sellstock = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [shares, setShares] = useState(0);
  const [orderType, setOrderType] = useState('market'); // Default to Market Order
  const [price, setPrice] = useState(0);
  const router = useRouter();

  const handleSell = async () => {
    if (!stockSymbol || shares <= 0 || price <= 0) {
      toast.error('Please provide valid stock details!');
      return;
    }

    // Perform the sell order logic (this is a simplified example)
    const { error } = await supabase
      .from('sell_orders')
      .insert([
        {
          stock_symbol: stockSymbol,
          shares: shares,
          order_type: orderType,
          price: price,
        },
      ]);

    if (error) {
      toast.error('Failed to execute the sell order.');
      console.error(error);
      return;
    }

    toast.success('Sell order placed successfully!');
    router.push('/portfolio'); // Navigate to the portfolio page after successful order
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sell Stock</h1>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.formField}>
          <label className={styles.label}>Stock Symbol</label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., AAPL"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Number of Shares</label>
          <input
            type="number"
            className={styles.input}
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Price (per share)</label>
          <input
            type="number"
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Order Type</label>
          <select
            className={styles.input}
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
          </select>
        </div>

        <button onClick={handleSell} className={styles.submitButton}>
          Place Sell Order
        </button>
      </div>
    </div>
  );
};

export default sellstock;
