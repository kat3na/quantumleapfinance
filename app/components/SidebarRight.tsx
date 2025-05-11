'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, BarChart, PieChart, Wallet, Users, Bell, Settings, LogOut, Book, AppWindow, TrendingUp, User, Banknote } from 'lucide-react';
import { cn } from '@/app/components/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';


const menuItems = [
  { icon: Home, label: 'Home', link: '/' },
  { icon: BarChart, label: 'Markets', link: '/markets' },
  { icon: PieChart, label: 'Portfolio', link: '/dashboard' },
  { icon: Wallet, label: 'Wallet', link: '/wallet' },
  { icon: Users, label: 'Community', link: '/community' },
  { icon: Bell, label: 'Alerts', link: '/alerts' },
  { icon: Settings, label: 'Settings', link: '/settings' },
  { icon:  Book, label: 'Education', link: '/education' },
  { icon: AppWindow, label: 'Apps', link: '/apps' },
  { icon: TrendingUp, label: 'Trending', link: '/trending' },
  { icon: User, label: 'Profile', link: '/profile' },
  { icon: Banknote, label: 'Finances', link: '/deposits' },
  { icon: LogOut, label: 'Logout', link: '/logout' },
];

const mockStocks = [
  { symbol: 'AAPL', price: 189.25 },
  { symbol: 'TSLA', price: 715.82 },
  { symbol: 'AMZN', price: 3210.11 },
  { symbol: 'GOOG', price: 2725.50 },
  { symbol: 'MSFT', price: 305.12 },
  { symbol: 'NVDA', price: 510.33 },
  { symbol: 'META', price: 385.76 },
  { symbol: 'NFLX', price: 453.29 },
  { symbol: 'AMD', price: 113.56 },
  { symbol: 'INTC', price: 38.15 },
];

export default function HomePage() {
  const [rightOpen, setRightOpen] = useState(false);
  const [stocks, setStocks] = useState(mockStocks);
  const router = useRouter();

  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  function setActive(label: string) {
    setActiveLabel(label);
  }

  const isActive = (label: string) => activeLabel === label;

  return (
    <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-15 bg-[#0a0a0a] border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
        {menuItems.map(({ icon: Icon, label, link }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          title={label}
          onClick={() => {
            router.push(link);
          }}
        >
          <div className={isActive(label) ? 'text-white-400' : 'text-white hover:text-green-400'}>
            <Icon />
          </div>
        </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex space-x-6 whitespace-nowrap px-4 py-2"
          >
            {stocks.map((stock, i) => (
              <div key={i} className="text-sm font-semibold text-green-400">
                {stock.symbol}: ${stock.price.toFixed(2)}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center h-full">
          <h2 className="absolute bottom-150 left-3 text-2xl font-bold text-white">QuantumLeapFinance</h2>
        </div>
      </div>

      {/* Right Sidebar Toggle */}
      <div className="absolute top-4 right-4">
        <Button variant="ghost" className="text-white" onClick={() => setRightOpen(!rightOpen)}>
          <Settings />
        </Button>
      </div>

      {/* Right Sidebar */}
      {rightOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="w-40 h-full bg-[#0a0a0a] border-l border-gray-800 p-4 fixed right-0 top-0 z-50"
        >
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            {menuItems.map(({ icon: Icon, label, link }) => (
              <li key={label}>
              <Link href={link}className="flex items-center space-x-2 text-white transform transition-all duration-300 ease-in-out hover:scale-100 hover:bg-gray-700 rounded-lg p-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
