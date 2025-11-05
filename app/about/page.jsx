"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/legacy/image";
import FixedButton from "@/components/FixedButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Quote from "./components/quote/quote.jsx";
import Skills from "./components/skills/skills.jsx";
import Experience from "./components/experience.jsx";
import Education from "./components/education.jsx";

// images
import Hero from "@/public/image/des3.jpg";

import Hr from "@/components/Hr";
import About from "./components/about/about.jsx";
import { useLanguage } from "@/components/LanguageProvider";
import aboutTranslations from "@/json/about.json";

export default function Page() {
	const [isColored, setIsColored] = useState(false);
	const imageRef = useRef(null);
	const { language } = useLanguage();
	const t = aboutTranslations[language] || aboutTranslations["en"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		let scrollTimeout;

		const handleScroll = () => {
			setIsColored(true);
			
			clearTimeout(scrollTimeout);
			
			scrollTimeout = setTimeout(() => {
				setIsColored(false);
			}, 150);
		};

		// Listen scroll untuk mobile
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			clearTimeout(scrollTimeout);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<main className="overflow-hidden">
				<FixedButton href="/#about">
					<FontAwesomeIcon
						icon={faChevronLeft}
						className="text-black dark:text-white pr-10"
					/>
				</FixedButton>
				<div className="relative h-screen  gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
					{/* hero */}
					<div className="z-0 mb-48 md:mb-0  md:absolute top-1/4  md:right-[10%] md:-translate-y-16 ">
						<motion.div
							ref={imageRef}
							initial={{ scale: 1 }}
							animate={{ scale: 1.6 }}
							transition={{ ease: "circOut", duration: 1 }}
							className={`relative bg-slate-300 dark:bg-gray-700 rounded-sm h-[320px] md:h-[600px] w-[80vw] md:w-[30vw] shadow-2xl overflow-hidden transition-all duration-500 ${
								isColored ? "grayscale-0" : "grayscale"
							} md:hover:grayscale-0`}>
							<Image
								src={Hero}
								alt="Destio Wahyu"
								layout="fill"
								objectFit="cover"
								objectPosition="center 20%"
								placeholder="blur"
							/>
							<div className="absolute inset-0 bg-black/0 dark:bg-black/10 pointer-events-none" />
						</motion.div>
					</div>
					<div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[65%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 pt-4 md:pt-0">
                    <h1 className="bg-[rgb(230,230,230)] dark:bg-[rgb(17,24,39)] px-3 md:px-0 text-black dark:text-white text-5xl md:text-8xl font-bold wipe-text" data-wipe-on-lang data-i18n-en={aboutTranslations.en.hero.title} data-i18n-id={aboutTranslations.id.hero.title}>
							{t.hero.title}
						</h1>
						<Hr />
					<p className="title text-xl mt-4 tracking-wider text-gray-500 dark:text-gray-400 leading-[1.7rem] mb-5 " data-fade-on-lang>
							{t.hero.description}{" "}
							<span className="bg-gray-300 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-50 px-2 py-1 rounded text-black dark:text-white">
								{" "}
								{t.hero.descriptionHighlight}
							</span>
						</p>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, ease: "circOut" }}
							onClick={() => {
								window.scrollTo({
									top: 1000,
									behavior: "smooth",
								});
							}}
							className="mb-3">
							<Button variation="primary">{t.hero.scrollDown}</Button>
						</motion.div>
					</div>
				</div>
				{/* end hero */}

				{/* about */}
				<About />
				{/* end about */}

				{/* skills */}
				<Skills />
				{/* end skills */}

				{/* experience */}
				<Experience />
				{/* end experience */}

				{/* Education */}
				<Education />
				{/* end Education */}

				{/* Quote */}
				<Quote />
				{/* end Quote */}

			</main>
		</>
	);
}
