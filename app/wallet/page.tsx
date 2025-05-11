'use client';

import React, { useState } from 'react';
import styles from './Wallet.module.css';
import { useRouter } from 'next/navigation';

const wallet = () => {
const router = useRouter();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const walletData = {
    cryptoBalance: '$5,200',
    fiatBalance: '$1,500',
    totalBalance: '$6,700'
  };

  const handleDeposit = () => {
    alert(`Depositing ${amount} ${currency}`);
  };

  const handleWithdraw = () => {
    alert(`Withdrawing ${amount} ${currency}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Wallet</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Wallet Overview</h2>
        <div className={styles.walletOverview}>
          <div className={styles.balanceBox}>
            <span>Crypto Balance</span>
            <strong>{walletData.cryptoBalance}</strong>
          </div>
          <div className={styles.balanceBox}>
            <span>Fiat Balance</span>
            <strong>{walletData.fiatBalance}</strong>
          </div>
          <div className={styles.balanceBox}>
            <span>Total Balance</span>
            <strong>{walletData.totalBalance}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Deposit / Withdraw</h2>
        <div className={styles.form}>
          <input 
            type="number" 
            className={styles.input} 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount" 
          />
          <select className={styles.select} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleDeposit}>Deposit</button>
            <button className={styles.button} onClick={handleWithdraw}>Withdraw</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default wallet;
