"use client"
import React from "react";
import Link from "next/link";

const NotFound = () => (
	<div>
		<div className="relative min-h-screen w-full  gap-4 p-10 flex justify-center items-center flex-col mb-10 ">
			<div className="min-h-screen flex justify-center items-center">
				<div className="mx-auto grid grid-cols-1   ">
					<div className="flex justify-center items-center flex-col mb-5 space-y-10">
						<div>
							<h3 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 text-center">
								ups ngga ada apa-apa disini
							</h3><hr></hr><br></br>
							<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400 text-center">
								Page not found
							</h2>
							<h1 className="text-4xl font-medium text-neutral-900 text-center">
								404
							</h1>
						</div>
						<div>
							<button
								onClick={() => window.history.back()}
								className="cursor-pointer text-lg text-900 hover:text-100 text-center border-2 border-gray-800 rounded-xl p-3 py-2 mt-2">
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default NotFound;
