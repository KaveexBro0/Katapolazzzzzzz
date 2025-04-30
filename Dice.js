import { motion } from 'framer-motion';

export default function Dice({ value }) {
  return (
    <motion.div
      className="w-24 h-24"
      animate={{ rotate: 360 }}
      transition={{ duration: 1 }}
    >
      <img src={`/dice-${value}.png`} alt={`Dice ${value}`} className="w-full" />
    </motion.div>
  );
}