"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CodepenIcon, VideoIcon, ActivityIcon, MobileIcon } from "./icons"
import { useLanguage } from "@/components/LanguageProvider";
import aboutTranslations from "@/json/about.json";

const getSkillCategories = (language) => {
	const t = aboutTranslations[language] || aboutTranslations["en"];
	const skillsT = t.skills;
	
	return {
		web: {
			category: "web",
			title: skillsT.categories.web.title,
			icon: CodepenIcon,
			description: skillsT.categories.web.description,
		languages: [
			"HTML",
			"CSS",
			"JavaScript",
			"PHP",
			"React",
			"NextJS",
			"TailwindCSS",
			"Bootstrap",
			"NodeJS",

		],
		tools: ["Visual Studio Code", "Mariadb", "MySQL", "PHPMyAdmin", "Adminer", "Git", "Github", "Figma", "Casa OS", "Docker", "Docker Compose", "Linux", "Armbian", "Mikrotik", "OpenWRT",],
	},
		video: {
			category: "video",
			title: skillsT.categories.video.title,
			icon: VideoIcon,
			description: skillsT.categories.video.description,
		languages: [
			"Adobe Premiere Pro",
			"Adobe After Effects",
			"Adobe Photoshop",
			"DaVinci Resolve",
			"Capcut",
		],
		tools: ["Masking Techniques", "Roto Brush", "Pen Tool", "Graphic Design", "Color Grading", "Keyframe Animation", "Video Effects", "Audio Editing", "3D Camera Tracking", "Motion Tracking", "Green Screen", "Video Compression", "Export Optimization"],
	},
		network: {
			category: "network",
			title: skillsT.categories.network.title,
			icon: ActivityIcon,
			description: skillsT.categories.network.description,
		languages: [
			"Mikrotik Winbox",
			"Linux",
			"Armbian",
			"Casa OS",
			"OpenWRT",
			"VirtualBox",
			"Docker",
			"SSH",
			"Putty",
			"Nextcloud",
			"Nginx",
			"Apache",
			"MySQL",
		],
		tools: [
			"Network Configuration",
			"VLAN Configuration",
			"Linux Server Setup",
			"SSH Access",
			"Self Hosting Services",
			"Docker Container Management",
			"Network Troubleshooting",
			"File Sharing",
			],
		},
	};
};

function SkillCard({ skill, isSelected, onClick }) {
	const Icon = skill.icon;

	return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer group p-6 rounded-2xl backdrop-blur-lg border transition-all duration-300 ${
		isSelected
			? "bg-gray-300 border-gray-900 border-4 shadow-2xl dark:border-gray-100"
			: "dark:bg-gray-300 border-gray-300/20 shadow-xl hover:bg-white/20 hover:border-gray-300/30 dark:bg-gray-900 dark:border-gray-700/40 dark:hover:bg-gray-800 dark:hover:border-gray-600/50"
		}`}

			whileHover={{
				scale: 1.05,
				rotateY: 5,
			}}
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}>
			{/* Glow effect - removed for selected state */}
			{!isSelected && (
				<div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-50 bg-gradient-to-r from-gray-400/20 to-gray-600/20 blur-xl" />
			)}

			<div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div
          className={`p-4 rounded-xl transition-all duration-300 ${
            isSelected ? "bg-gray-400/60 dark:bg-gray-800/60" : "bg-gray-400/60 dark:bg-gray-900/60 group-hover:bg-gray-100/60 dark:group-hover:bg-gray-800/60"
          }`}>
          <Icon className={`w-8 h-8 ${isSelected ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}`} />
				</div>
				<div>
				<h3
				className={`font-semibold text-lg mb-2 ${
					isSelected
					? "text-white dark:text-white"
					: "text-black dark:text-black"
				}`}
				>
				{skill.title}
				</h3>

				<p
				className={`text-sm leading-relaxed ${
					isSelected
					? "text-white dark:text-white"
					: "text-black dark:text-black"
				}`}
				>
				{skill.description}
				</p>




				</div>
			</div>
		</motion.div>
	);
}

function SkillDetails({ selectedSkill, language }) {
	if (!selectedSkill) return null;
	const t = aboutTranslations[language] || aboutTranslations["en"];
	const labels = t.skills.labels[selectedSkill.category] || t.skills.labels.web;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className="mt-12 space-y-8">
			{/* First Section */}
      <motion.div
        className="backdrop-blur-lg bg-gray-100 dark:bg-gray-800 border border-gray-300/30 dark:border-gray-700/40 rounded-2xl p-8"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}>
        <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">
					{labels.first}
				</h3>
				<div className="flex flex-wrap justify-center gap-3">
					{selectedSkill.languages.map((lang, index) => (
						<motion.span
							key={lang}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.3 + index * 0.1 }}
            className="px-4 py-2 bg-gradient-to-r from-gray-200/60 to-white/40 dark:from-gray-800/60 dark:to-gray-900/40
                   border border-gray-400/40 dark:border-gray-700/60 rounded-full text-black dark:text-gray-200 font-medium
                   backdrop-blur-sm hover:scale-105 transition-transform cursor-default
                   hover:bg-gradient-to-r hover:from-gray-300/60 hover:to-white/50 dark:hover:from-gray-700/60 dark:hover:to-gray-800/50">
							{lang}
						</motion.span>
					))}
				</div>
			</motion.div>

			{/* Second Section */}
      <motion.div
        className="backdrop-blur-lg bg-gray-100 dark:bg-gray-800 border border-gray-300/30 dark:border-gray-700/40 rounded-2xl p-8"
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.4 }}>
        <h3 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">
					{labels.second}
				</h3>
				<div className="flex flex-wrap justify-center gap-3">
					{selectedSkill.tools.map((tool, index) => (
						<motion.span
							key={tool}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.5 + index * 0.1 }}
            className="px-4 py-2 bg-gradient-to-r from-gray-300/60 to-gray-100/40 dark:from-gray-800/60 dark:to-gray-900/40
                   border border-gray-500/40 dark:border-gray-700/60 rounded-full text-black dark:text-gray-200 font-medium
                   backdrop-blur-sm hover:scale-105 transition-transform cursor-default
                   hover:bg-gradient-to-r hover:from-gray-400/60 hover:to-gray-200/50 dark:hover:from-gray-700/60 dark:hover:to-gray-800/50">
							{tool}
						</motion.span>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}

export default function Skills() {
	const [selectedCategory, setSelectedCategory] = useState("web");
	const { language } = useLanguage();
	const t = aboutTranslations[language] || aboutTranslations["en"];
	const skillCategories = getSkillCategories(language);
	
	return (
		<div className="relative">
			<div className="mx-auto container px-6 py-20">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-4 mb-16">
					<h2 className="text-5xl font-bold bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
						{t.skills.title}
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
						{t.skills.description}
					</p>
				</motion.div>

				{/* Skill Categories Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{Object.entries(skillCategories).map(([key, skill], index) => (
						<motion.div
							key={key}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}>
							<SkillCard
								skill={skill}
								isSelected={selectedCategory === key}
								onClick={() => setSelectedCategory(key)}
							/>
						</motion.div>
					))}
				</div>

				{/* Skill Details */}
				<AnimatePresence mode="wait">
					<SkillDetails selectedSkill={skillCategories[selectedCategory]} language={language} />
				</AnimatePresence>
			</div>
		</div>
	);
}
