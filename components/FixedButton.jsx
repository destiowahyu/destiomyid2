"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const FixedButton = ({ children, href = '/' }) => (
	<motion.div
		className="fixed top-2 -left-2 md:left-10 z-50"
		whileHover={{ scale: 1.08, rotate: -2 }}
		whileTap={{ scale: 0.95, rotate: 0 }}
	>
	<Link
		href={href}
			className="flex justify-center items-center rounded-full p-4 transition duration-300 ease-in-out transparent"
		>
		{children}
	</Link>
	</motion.div>
);

export default FixedButton;
