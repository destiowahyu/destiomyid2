import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import BlurImage from "@/public/image/placeholder/blur.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faEye } from "@fortawesome/free-solid-svg-icons";

export default function ProjectCard({ project, index, activeCategory }) {
	const handleButtonClick = (e) => {
		e.stopPropagation();
	};

	return (
		<>
			{project.category.includes(parseInt(activeCategory)) && (
				<motion.div
					className="z-10 relative flex justify-center items-center flex-col mb-5 w-full h-auto group/tes aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
					key={index}
					initial={{
						opacity: 0,
						x: -200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						type: "spring",
					}}
					whileHover={{ y: -4, scale: 1.01 }}
					whileTap={{ scale: 0.985 }}
				>
					{/* Thumbnail Image - Visible by default */}
					<Image
						src={project.thumbnail}
						alt={project.title}
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						className="bg-slate-950 opacity-100 group-hover/tes:opacity-20 transition-all ease duration-500"
						blurDataURL={BlurImage.src}
					/>
					{/* Overlay - Darkens on hover */}
					<div className="absolute inset-0 bg-black/0 group-hover/tes:bg-black/60 transition-all ease duration-500"></div>
					
					{/* Top Left Badge */}
					<div className="absolute top-2 left-2 md:top-3 md:left-3 px-3 py-1.5 md:px-4 md:py-2 bg-gray-400/80 dark:bg-gray-900/80 backdrop-blur-sm opacity-100 group-hover/tes:opacity-100 transition-opacity duration-500 z-20 rounded-lg">
						<h4 className="text-white text-xs md:text-sm font-medium whitespace-nowrap">{project.left || project.year}</h4>
					</div>
					{/* Top Right Badge */}
					<div className="absolute top-2 right-2 md:top-3 md:right-3 px-3 py-1.5 md:px-4 md:py-2 bg-gray-400/80 dark:bg-gray-900/80 backdrop-blur-sm opacity-100 group-hover/tes:opacity-100 transition-opacity duration-500 z-20 rounded-lg">
						<h4 className="text-white text-xs md:text-sm font-medium whitespace-nowrap">{project.right}</h4>
					</div>
					
					{/* Content - Hidden by default, shown on hover */}
					<div className="transition-all ease duration-500 opacity-0 content text-center group-hover/tes:opacity-100 z-30 relative w-full h-full flex flex-col justify-between items-center p-4 md:p-6 overflow-hidden">
						{/* Top section - Title and Description */}
						<div className="flex flex-col items-center justify-start w-full flex-shrink-0 pt-6 md:pt-4">
							<h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-white drop-shadow-lg line-clamp-2 px-2 max-w-full break-words">
								{project.title}
							</h1>
							<p className="text-white/90 drop-shadow-md text-xs md:text-sm line-clamp-2 md:line-clamp-3 px-2 mb-2 md:mb-3 max-w-full break-words">
								{project.desc[0]}
							</p>
						</div>
						
						{/* Middle section - Tech Tags */}
						<div className="flex justify-center items-center flex-row flex-wrap gap-1.5 md:gap-2 max-w-full px-2 flex-shrink-0 my-1 md:my-2 max-h-16 md:max-h-20 overflow-hidden">
							{project.tech.slice(0, 6).map((t, techIndex) => (
								<span
									key={techIndex}
									className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs md:text-sm whitespace-nowrap">
									{t}
								</span>
							))}
							{project.tech.length > 6 && (
								<span className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs md:text-sm whitespace-nowrap">
									+{project.tech.length - 6}
								</span>
							)}
						</div>
						
						{/* Bottom section - Action Buttons */}
						<div className="flex justify-center items-center gap-2 md:gap-3 mt-1 md:mt-2 flex-shrink-0 flex-wrap pb-1">
							<motion.div
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className="relative"
							>
								<Link 
									href={"projects/" + project.slug}
									onClick={handleButtonClick}
									className="group/btn relative px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold flex items-center gap-1.5 md:gap-2 overflow-hidden isolate text-sm md:text-base"
								>
									{/* Glassmorphism background with gradient border */}
									<div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-400/30 dark:via-purple-400/30 dark:to-pink-400/30 backdrop-blur-md border border-white/30 dark:border-white/20"></div>
									
									{/* Animated gradient border glow */}
									<div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
									
									{/* Inner glow effect */}
									<div className="absolute inset-[1px] rounded-xl md:rounded-2xl bg-black/40 dark:bg-black/60 backdrop-blur-sm"></div>
									
									{/* Animated shimmer effect */}
									<motion.div
										className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
										animate={{
											translateX: ["-100%", "200%"]
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											repeatDelay: 2,
											ease: "easeInOut"
										}}
									/>
									
									{/* Content */}
									<span className="relative z-10 text-white dark:text-gray-100 flex items-center gap-2">
										<FontAwesomeIcon icon={faEye} className="text-sm" />
										<span>Detail</span>
									</span>
								</Link>
							</motion.div>
							
							{project.preview && (
								<motion.div
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="relative"
								>
									<a
										href={project.preview}
										target="_blank"
										rel="noopener noreferrer"
										onClick={handleButtonClick}
										className="group/btn relative px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold flex items-center gap-1.5 md:gap-2 overflow-hidden isolate text-sm md:text-base"
									>
										{/* Glassmorphism background with gradient border */}
										<div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 dark:from-cyan-400/30 dark:via-blue-400/30 dark:to-indigo-400/30 backdrop-blur-md border border-white/30 dark:border-white/20"></div>
										
										{/* Animated gradient border glow */}
										<div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
										
										{/* Inner glow effect */}
										<div className="absolute inset-[1px] rounded-xl md:rounded-2xl bg-black/40 dark:bg-black/60 backdrop-blur-sm"></div>
										
										{/* Animated shimmer effect */}
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
											animate={{
												translateX: ["-100%", "200%"]
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												repeatDelay: 2,
												ease: "easeInOut"
											}}
										/>
										
										{/* Content */}
										<span className="relative z-10 text-white dark:text-gray-100 flex items-center gap-2">
											<span>Preview</span>
											<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm" />
										</span>
									</a>
								</motion.div>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
}

ProjectCard.propTypes = {
	project: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
};
