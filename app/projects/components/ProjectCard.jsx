import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import BlurImage from "@/public/image/placeholder/blur.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faEye, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ProjectCard({ project, index, activeCategory }) {
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
	
	// Check jika ini video editing project (category 2 atau ada field video)
	const isVideoEditing = project.category.includes(2) || project.video;

	const handleButtonClick = (e) => {
		e.stopPropagation();
	};

	const handlePlayVideo = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setIsVideoModalOpen(true);
	};

	const handleCloseVideoModal = () => {
		setIsVideoModalOpen(false);
	};

	// Ref untuk memastikan warna tetap abu-abu meskipun theme provider mengubah
	const detailBtnRef = useRef(null);
	const previewBtnRef = useRef(null);

	// Fungsi untuk memaksa warna tetap abu-abu
	const forceButtonColor = () => {
		const buttonColor = '#e5e5e5';
		if (detailBtnRef.current) {
			detailBtnRef.current.style.color = buttonColor;
			const allSpans = detailBtnRef.current.querySelectorAll('span');
			const allIcons = detailBtnRef.current.querySelectorAll('svg');
			allSpans.forEach(span => {
				span.style.color = buttonColor;
			});
			allIcons.forEach(icon => {
				icon.style.color = buttonColor;
				icon.style.fill = buttonColor;
			});
		}
		if (previewBtnRef.current) {
			previewBtnRef.current.style.color = buttonColor;
			const allSpans = previewBtnRef.current.querySelectorAll('span');
			const allIcons = previewBtnRef.current.querySelectorAll('svg');
			allSpans.forEach(span => {
				span.style.color = buttonColor;
			});
			allIcons.forEach(icon => {
				icon.style.color = buttonColor;
				icon.style.fill = buttonColor;
			});
		}
	};

	useEffect(() => {
		// Memaksa warna saat component mount (dengan delay untuk memastikan DOM sudah ready)
		// Hanya untuk non-video projects
		if (!isVideoEditing) {
			const initTimeout = setTimeout(() => {
				forceButtonColor();
			}, 50);

			// Observer untuk memantau perubahan DOM (jika theme provider mengubah style)
			const observer = new MutationObserver(() => {
				forceButtonColor();
			});

			// Observe perubahan attribute style pada button dengan delay
			const setupObserver = () => {
				if (detailBtnRef.current) {
					observer.observe(detailBtnRef.current, {
						attributes: true,
						attributeFilter: ['style', 'class'],
						subtree: true,
						childList: true
					});
				}
				if (previewBtnRef.current) {
					observer.observe(previewBtnRef.current, {
						attributes: true,
						attributeFilter: ['style', 'class'],
						subtree: true,
						childList: true
					});
				}
			};

			setTimeout(setupObserver, 100);

			// Interval check sebagai backup - memaksa warna setiap 500ms
			const colorCheckInterval = setInterval(() => {
				forceButtonColor();
			}, 500);

			// Listen untuk perubahan theme (jika menggunakan event)
			const handleThemeChange = () => {
				setTimeout(forceButtonColor, 50);
			};
			window.addEventListener('storage', handleThemeChange);
			document.addEventListener('themechange', handleThemeChange);

			// Juga listen untuk perubahan class pada body/html (biasanya theme provider mengubah ini)
			const bodyObserver = new MutationObserver(() => {
				setTimeout(forceButtonColor, 50);
			});
			if (document.body) {
				bodyObserver.observe(document.body, {
					attributes: true,
					attributeFilter: ['class']
				});
			}
			if (document.documentElement) {
				bodyObserver.observe(document.documentElement, {
					attributes: true,
					attributeFilter: ['class']
				});
			}

			// Cleanup
			return () => {
				clearTimeout(initTimeout);
				clearInterval(colorCheckInterval);
				observer.disconnect();
				bodyObserver.disconnect();
				window.removeEventListener('storage', handleThemeChange);
				document.removeEventListener('themechange', handleThemeChange);
			};
		}
	}, [project.preview, isVideoEditing]); // Re-run jika project.preview berubah

	// ESC key handler untuk close video modal
	useEffect(() => {
		if (isVideoModalOpen) {
			const handleEsc = (e) => {
				if (e.key === 'Escape') {
					handleCloseVideoModal();
				}
			};
			window.addEventListener('keydown', handleEsc);
			return () => window.removeEventListener('keydown', handleEsc);
		}
	}, [isVideoModalOpen]);

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
						className="bg-slate-950 opacity-100 group-hover/tes:opacity-5 transition-all ease duration-500"
						blurDataURL={BlurImage.src}
					/>
					{/* Overlay - Darkens on hover */}
					<div className="absolute inset-0 bg-black/0 group-hover/tes:bg-black/40 transition-all ease duration-500"></div>
					
					{/* Top Left Badge */}
					<div className="absolute top-2 left-2 md:top-3 md:left-3 px-3 py-1.5 md:px-4 md:py-2 bg-gray-300/90 dark:bg-gray-900/80 backdrop-blur-sm opacity-100 group-hover/tes:opacity-100 transition-opacity duration-500 z-20 rounded-lg">
						<h4 className="text-white text-xs md:text-sm font-medium whitespace-nowrap">{project.left || project.year}</h4>
					</div>
					{/* Top Right Badge */}
					<div className="absolute top-2 right-2 md:top-3 md:right-3 px-3 py-1.5 md:px-4 md:py-2 bg-gray-300/90 dark:bg-gray-900/80 backdrop-blur-sm opacity-100 group-hover/tes:opacity-100 transition-opacity duration-500 z-20 rounded-lg">
						<h4 className="text-white text-xs md:text-sm font-medium whitespace-nowrap">{project.right}</h4>
					</div>
					
					{/* Content - Different for Video Editing vs Regular Projects */}
					{isVideoEditing ? (
						/* Video Editing - Only Play Button on Hover */
						<div className="transition-all ease duration-500 opacity-0 content text-center group-hover/tes:opacity-100 z-30 absolute inset-0 flex flex-col justify-center items-center p-4 md:p-6">
							<motion.button
								onClick={handlePlayVideo}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-2xl transition-all duration-300 group/play"
							>
								{/* Ripple effect */}
								<motion.div
									className="absolute inset-0 rounded-full bg-red-600"
									animate={{
										scale: [1, 1.5, 1.5],
										opacity: [0.6, 0, 0],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeOut",
									}}
								/>
								<FontAwesomeIcon 
									icon={faPlay} 
									className="text-white text-2xl md:text-3xl ml-1 relative z-10" 
								/>
							</motion.button>
						</div>
					) : (
						/* Regular Project - Title, Description, Tech Tags, and Buttons */
						<div className="transition-all ease duration-500 opacity-0 content text-center group-hover/tes:opacity-100 z-30 absolute inset-0 flex flex-col justify-center items-center p-4 md:p-6">
							{/* Title and Description Container */}
							<div className="flex flex-col items-center justify-center space-y-2 md:space-y-3 mb-3 md:mb-4">
								<h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-lg line-clamp-2 px-2 max-w-full break-words">
									{project.title}
								</h1>
								<p className="text-white/90 drop-shadow-md text-xs md:text-sm line-clamp-2 md:line-clamp-3 px-2 max-w-full break-words">
									{project.desc[0]}
								</p>
							</div>
							
							{/* Tech Tags Container */}
							<div className="flex justify-center items-center flex-wrap gap-1.5 md:gap-2 max-w-full px-2 mb-4 md:mb-6">
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
							
							{/* Action Buttons Container - Centered */}
							<div className="flex justify-center items-center gap-3 md:gap-4">
							<motion.div
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className="relative"
							>
								<Link 
									ref={detailBtnRef}
									href={"projects/" + project.slug}
									onClick={handleButtonClick}
									className="group/btn project-card-btn-detail relative px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold flex items-center gap-1.5 md:gap-2 overflow-hidden isolate text-sm md:text-base"
									data-btn-text-color="#e5e5e5"
									style={{ 
										'--btn-text-color': '#e5e5e5',
										color: '#e5e5e5'
									}}
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
									<span 
										className="relative z-10 flex items-center gap-2 project-card-btn-text" 
										style={{ 
											color: '#e5e5e5',
											'--btn-text-color': '#e5e5e5'
										}}
									>
										<FontAwesomeIcon 
											icon={faEye} 
											className="text-sm project-card-btn-icon" 
											style={{ 
												color: '#e5e5e5',
												fill: '#e5e5e5'
											}}
										/>
										<span 
											className="project-card-btn-label" 
											style={{ 
												color: '#e5e5e5',
												'--btn-text-color': '#e5e5e5'
											}}
										>
											Detail
										</span>
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
										ref={previewBtnRef}
										href={project.preview}
										target="_blank"
										rel="noopener noreferrer"
										onClick={handleButtonClick}
										className="group/btn project-card-btn-preview relative px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-semibold flex items-center gap-1.5 md:gap-2 overflow-hidden isolate text-sm md:text-base"
										data-btn-text-color="#e5e5e5"
										style={{ 
											'--btn-text-color': '#e5e5e5',
											color: '#e5e5e5'
										}}
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
										<span 
											className="relative z-10 flex items-center gap-2 project-card-btn-text" 
										style={{ 
											color: '#e5e5e5',
											'--btn-text-color': '#e5e5e5'
										}}
									>
											<span 
												className="project-card-btn-label" 
												style={{ 
													color: '#e5e5e5',
													'--btn-text-color': '#e5e5e5'
												}}
											>
												Preview
											</span>
											<FontAwesomeIcon 
												icon={faArrowUpRightFromSquare} 
												className="text-sm project-card-btn-icon" 
												style={{ 
													color: '#e5e5e5',
													fill: '#e5e5e5'
												}}
											/>
										</span>
									</a>
								</motion.div>
							)}
						</div>
					</div>
					)}
				</motion.div>
			)}

			{/* Video Modal */}
			<AnimatePresence>
				{isVideoModalOpen && project.video && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
						onClick={handleCloseVideoModal}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Close Button */}
							<button
								onClick={handleCloseVideoModal}
								className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors duration-200 group/close"
							>
								<FontAwesomeIcon icon={faTimes} className="text-xl group-hover/close:scale-110 transition-transform" />
							</button>

							{/* YouTube Embed */}
							<iframe
								key={project.video}
								src={`${project.video}?autoplay=1&rel=0&modestbranding=1`}
								title={project.title}
								className="w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

ProjectCard.propTypes = {
	project: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
};
