import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function LetsTalkButton() {
  return (
    <Link to="https://wa.link/n7aavn" target="_blank">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="bg-gray-900 dark:bg-riptide-200 text-gray-50 rounded-lg hover:bg-gray-800 dark:hover:bg-riptide-300">
          <MessageCircle className="w-4 h-4 mr-2" />
          Let's Chat
        </Button>
      </motion.div>
    </Link>
  );
} 