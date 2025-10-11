// Lazy Framer Motion - sadece gerektiğinde yükle
let framerMotionInstance: any = null;

export const getFramerMotion = async () => {
  if (framerMotionInstance) {
    return framerMotionInstance;
  }

  // Framer Motion'i sadece gerektiğinde import et
  const { motion, AnimatePresence, useScroll, useTransform } = await import('framer-motion');
  
  framerMotionInstance = { motion, AnimatePresence, useScroll, useTransform };
  return framerMotionInstance;
};

// Sadece motion için lazy loader
export const getMotion = async () => {
  const framerMotion = await getFramerMotion();
  return framerMotion.motion;
};

// Sadece AnimatePresence için lazy loader
export const getAnimatePresence = async () => {
  const framerMotion = await getFramerMotion();
  return framerMotion.AnimatePresence;
};

// Sadece useScroll için lazy loader
export const getUseScroll = async () => {
  const framerMotion = await getFramerMotion();
  return framerMotion.useScroll;
};

// Sadece useTransform için lazy loader
export const getUseTransform = async () => {
  const framerMotion = await getFramerMotion();
  return framerMotion.useTransform;
};


