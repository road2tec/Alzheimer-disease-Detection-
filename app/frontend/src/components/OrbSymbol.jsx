import React from 'react';
import { motion } from 'framer-motion';

const OrbSymbol = ({ size = "md", className = "" }) => {
    const dimensions = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-48 h-48"
    };

    const containerSize = dimensions[size] || size;

    return (
        <div className={`relative ${containerSize} flex items-center justify-center ${className}`}>
            {/* Outer Glow/Circle */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-medical-400/20 rounded-full blur-[4px]"
            />

            {/* Secondary Overlapping Circle */}
            <motion.div
                animate={{
                    x: [-2, 2, -2],
                    y: [-2, 2, -2],
                    scale: [1, 0.9, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[70%] h-[70%] bg-white/40 rounded-full blur-[2px] translate-x-[15%] -translate-y-[5%]"
            />

            {/* Accent Circle */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [2, -2, 2]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute w-[50%] h-[50%] bg-medical-200/60 rounded-full blur-[1px] -translate-x-[10%] translate-y-[10%]"
            />

            {/* Core Light */}
            <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-[20%] h-[20%] bg-white rounded-full blur-[2px]"
            />
        </div>
    );
};

export default OrbSymbol;
