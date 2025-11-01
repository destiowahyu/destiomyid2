import Image from "next/image";
import MusicPlayer from "./MusicPlayer";
import { motion } from "framer-motion";
import Me1 from "@/public/image/des10.jpg";
import Me2 from "@/public/image/des6.jpg";
import Me3 from "@/public/image/des5.webp";
import Hr from "@/components/Hr";
import { useState } from "react";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start ">
				<Hr variant="long"></Hr>
				<h1 className="text-3xl font-bold mt-3">Who Am I?</h1>
			</div>
		</div>
	);
}

function AnimatedImage({ src, alt }) {
	const [hovered, setHovered] = useState(false);
	const [xy, setXY] = useState([0, 0]);

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height;
		const rotate = ((x - centerX) / centerX) * 10; // -10deg to 10deg
		const zoom = 1.08 + ((y - centerY) / centerY) * 0.02;
		setXY([rotate, zoom]);
	};

	const handleMouseLeave = () => {
		setHovered(false);
		setXY([0, 1]);
	};

	return (
		<motion.div
			style={{ transformOrigin: 'bottom' }}
			initial={{ scale: 1, rotate: 0 }}
			animate={hovered ? { scale: xy[1], rotate: xy[0] } : { scale: 1, rotate: 0 }}
			transition={{ type: 'spring', stiffness: 120, damping: 10, mass: 0.7, ease: 'easeOut' }}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={handleMouseLeave}
			className="w-full h-full">
			<Image
				src={src}
				alt={alt}
				layout="fill"
				objectFit="cover"
				placeholder="blur"
			/>
		</motion.div>
	);
}

export default function About() {
	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
				<div className="flex justify-center items-start flex-col mb-5 ">
					<div className="images relative w-full  aspect-square">
						<div className="absolute top-28 left-10 w-[50%]  aspect-square transition-all ease duration-300">
							<AnimatedImage src={Me1} alt="Destio" />
						</div>
						<div className="absolute top-16 right-28 w-[30%]  aspect-square transition-all ease duration-300">
							<AnimatedImage src={Me2} alt="Destio" />
						</div>
						<div className="absolute bottom-16 right-20 w-[40%]  aspect-square transition-all ease duration-300">
							<AnimatedImage src={Me3} alt="Destio" />
						</div>
					</div>
				</div>
				<motion.div
					className="flex justify-center items-start flex-col mb-5 md:px-10"
					initial={{
						opacity: 0,
						x: 200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						delay: 0.5,

						type: "spring",
					}}>
					<h2 className="text-2xl font-bold tracking-wider mb-3">
						Destio Wahyu Lanio
					</h2>
					<p className="text-gray-600 text-justify title text-lg">
						Hey there, I&rsquo;m Destio, 
						a fresh graduate in Software Engineering from Universitas 
						Dian Nuswantoro (UDINUS) with a strong passion for Web Development 
						and the creative industry. I enjoy building functional and 
						user-friendly web applications using modern technologies, 
						while also excelling in video editing, photo editing, 
						and graphic design. Beyond tech and design, I love music and 
						often create my own covers, handling everything from recording 
						to mixing. With this mix of technical and creative skills, 
						I strive to keep learning, adapting, and creating impactful digital 
						experiences.
					</p>
					<MusicPlayer />
				</motion.div>
			</div>
		</>
	);
}
