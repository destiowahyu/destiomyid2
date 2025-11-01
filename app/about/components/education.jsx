"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMedal,
	faGraduationCap,
	faTrophy,
	faAward,
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Me4 from "@/public/image/des8.jpg";
import Me5 from "@/public/image/des7.jpg";
import Me6 from "@/public/image/des9.jpg";
import { useLanguage } from "@/components/LanguageProvider";
import aboutTranslations from "@/json/about.json";

function Wrapper({ children }) {
	return (
		<div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10">
			<motion.div
				className="flex justify-center items-start flex-col mb-5"
				initial={{
					opacity: 0,
					y: 50,
				}}
				whileInView={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					delay: 0.3,
					duration: 0.8,
					type: "spring",
					stiffness: 100,
				}}>
				{children}
			</motion.div>
		</div>
	);
}

export default function Education() {
	const [isExpanded, setIsExpanded] = useState(false);
	const { language } = useLanguage();
	const t = aboutTranslations[language] || aboutTranslations["en"];

	const achievementsByYear = {
		2025: [
			{
				icon: faAward,
				title: "Certification Scheme Of Web Developer",
				subtitle: "Indonesian Professional Certification Authority (BNSP)",
				date: "Jan 2025",
				color: "from-blue-500 to-purple-600",
			},
			{
				icon: faAward,
				title: "TOEFL Score: 490",
				subtitle: "Center for Foreign Language Training (CLFT) UDINUS",
				date: "Jan 2025",
				color: "from-blue-500 to-purple-600",
			},
		],
		2024: [
			{
				icon: faAward,
				title: "SEMNASTI | Indonesia's Cyber Security Challenge in Building a Robust Defense",
				subtitle: "Himpunan Mahasiswa Teknik Informatika (HMTI) UDINUS",
				date: "Nov 2024",
				color: "from-blue-500 to-purple-600",
			},
		],
		2023: [
			{
				icon: faAward,
				title: "SEMNASTI | Cyber Security Awarness for Securing Data",
				subtitle: "Himpunan Mahasiswa Teknik Informatika (HMTI) UDINUS",
				date: "Jun 2023",
				color: "from-blue-500 to-purple-600",
			},
		],

	};

	// Flatten all achievements into a single array for easier limiting
	const allAchievements = Object.entries(achievementsByYear)
		.sort(([a], [b]) => parseInt(b) - parseInt(a))
		.flatMap(([year, achievements]) =>
			achievements.map((achievement) => ({ ...achievement, year }))
		);

	const visibleAchievements = isExpanded
		? allAchievements
		: allAchievements.slice(0, 2);
	const hasMoreAchievements = allAchievements.length > 2;

	return (
		<Wrapper>
			<section className="grid gap-8 md:gap-12">
				{" "}
				{/* Header */}
				<motion.div
					className="text-center space-y-2"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white">
						{t.education.title}
					</h1>
					<p className="text-muted-foreground max-w-[800px] mx-auto text-gray-600 dark:text-gray-400">
						{t.education.description}
					</p>
				</motion.div>
				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Education Section - Left */}
					<motion.div
						className="px-5"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<div className="font-medium text-lg mb-4 text-black dark:text-white">{t.education.period}</div>
						<div>
							<h2 className="font-semibold text-xl text-black dark:text-white">
								{t.education.university}
							</h2>
							<h3 className="text-md font-normal mb-3 text-gray-700 dark:text-gray-300">
								{t.education.degree}
							</h3>
							<div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me5}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me4}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me6}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 dark:text-gray-300 text-justify title text-lg whitespace-pre-line">
									{t.education.universityDescription}
								</p>
							</div>
							<div className="flex flex-wrap gap-2 mt-4 text-sm">
								<div className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-2xl">
									{t.education.gpa}
								</div>
							</div>
						</div>
					</motion.div>{" "}
					{/* Achievements Section - Right */}
					<motion.div
						className="flex flex-col justify-start px-5 md:px-0"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<h2 className="font-semibold text-xl mt-7 text-black dark:text-white">{t.education.achievements.title}</h2>
						<p className="text-md font-normal mb-3 md:mb-6 text-gray-700 dark:text-gray-300">
							{t.education.achievements.description}
						</p>

						{/* Achievements Container with transparent bottom effect */}
						<div className="relative">
							<div className="space-y-4">
								{/* Show visible achievements */}
								<AnimatePresence>
									{visibleAchievements.map((achievement, index) => (
										<motion.div
											key={`${achievement.year}-${index}`}
											className="group"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.5, delay: index * 0.05 }}>
											{/* Year indicator for first achievement of each year */}
											{index === 0 ||
											visibleAchievements[index - 1]?.year !==
												achievement.year ? (
												<div className="flex items-center gap-3 mb-3 mt-2">
													<div className="w-8 h-8 rounded-full bg-gray-400/40 dark:bg-gray-700 flex items-center justify-center">
														<span className="text-xs font-bold text-gray-600 dark:text-gray-300">
															{achievement.year}
														</span>
													</div>
													<div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
												</div>
											) : null}

											{/* Glassmorphism achievement card with monochrome to color effect */}
											<div className="bg-white/20 dark:bg-gray-800/90 backdrop-blur-md border border-white/30 dark:border-gray-700/50 rounded-2xl p-4 shadow-lg hover:bg-white/30 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-xl hover:grayscale-1">
												<div className="flex items-center gap-4">
													<div
														className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}>
														<FontAwesomeIcon
															icon={achievement.icon}
															className="text-white h-5 w-5"
														/>
													</div>
													<div>
														<h3 className="font-medium text-black dark:text-white">{achievement.title}</h3>
														<p className="text-sm text-gray-700 dark:text-gray-300">{achievement.subtitle}</p>
														<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
															{achievement.date}
														</div>
													</div>
												</div>
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							</div>

							{/* Transparent bottom overlay when not expanded */}
							{!isExpanded && hasMoreAchievements && (
								<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-200 dark:from-gray-900 via-gray-100/70 dark:via-gray-900/70 to-transparent pointer-events-none"></div>
							)}

							{/* Expand/Collapse Button */}
							{hasMoreAchievements && (
								<motion.div
									className="flex justify-center mt-6"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}>
									<button
										onClick={() => setIsExpanded(!isExpanded)}
										className="flex items-center gap-2 px-6 py-3 bg-white/30 dark:bg-gray-700/60 backdrop-blur-md border border-white/40 dark:border-gray-600/50 rounded-full hover:bg-white/40 dark:hover:bg-gray-700/80 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl text-black dark:text-white">
										<span>
											{isExpanded
												? t.education.achievements.showLess
												: t.education.achievements.showMore.replace("{count}", allAchievements.length - 2)}
										</span>
										<FontAwesomeIcon
											icon={isExpanded ? faChevronUp : faChevronDown}
											className="h-3 w-3 transition-transform duration-300"
										/>
									</button>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</Wrapper>
	);
}
