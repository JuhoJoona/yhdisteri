'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details
    const timer = setTimeout(() => {
      setOrderNumber(`YHD-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-black font-medium">Processing your payment...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle
                  className="w-20 h-20 text-black"
                  strokeWidth={1.5}
                />
              </motion.div>
              <h1 className="text-3xl font-bold text-black">
                Payment Successful
              </h1>
              <p className="text-gray-600 max-w-sm">
                Thank you for your purchase. We&apos;ve received your payment
                and are processing your order.
              </p>
            </div>

            <Card className="border-2 border-black">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order number</span>
                  <span className="font-mono font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="bg-black text-white px-2 py-1 text-xs rounded-full">
                    Confirmed
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated delivery</span>
                  <span className="font-medium">3-5 business days</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-3">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Package className="mr-2 h-4 w-4" /> Track your order
              </Button>
              <Link href="/" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-gray-100"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Return to home
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Questions? Contact{' '}
                <Link
                  href="mailto:support@yhdisteri.com"
                  className="underline hover:text-black"
                >
                  support@yhdisteri.com
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
