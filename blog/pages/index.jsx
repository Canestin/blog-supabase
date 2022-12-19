import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import connaissance from "../public/images/connaissance.png";

export default function Home({ articlesHomePages }) {
	return (
		<>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="w-full h-full bg-slate-900 pt-20">
				<div className="w-full h-full text-start text-white ">
					<div className=" w-full mx-auto h-5/6 flex justify-start bg-slate-900 ">
						<div className="w-1/2 bg-slate-900 p-10  border-white py-15">
							<h1 className="font-semibold mt-8">Vous voulez partager</h1>
							<h1 className="font-semibold">un article</h1>
							<p className="my-2 text-lg mt-8">
								Bonjour, nous sommes Abessolo et Affadjene, <br /> étudiants à
								l'ECE-Paris, nous vous donnons l'oprotunité <br />
								de rediger votre article et de le publiez 😊!
							</p>
							<h3 className="my-5">
								Le partage est l'un des principes les plus forts
							</h3>
							<button class="bg-white hover:bg-sky-500/10 hover:text-white mt-7 text-black  font-semibold  p-2 rounded-md flex items-center justify-center hover:scale-105 ease-in duration-300 cursor-pointer shadow-lg shadow-black-10  mb-2 ">
								{/* link to the login page */}
								<Link href="#">
									<small>Rediger...</small>
								</Link>
							</button>
						</div>
						<div className="flex flex-col p-12 w-1/2  items-center  border-white ">
							<p className="mt-8">Partagez votre connaissance</p>
							{/* caroussel */}
							<div>
								<Image
									className="rounded-xl shadow-xl shadow-black-500"
									src={connaissance}
									width={1000}
									height={500}
									alt="connaisance"
								/>
							</div>
							{/* fin caroussel */}
						</div>
					</div>
				</div>
				<div className="w-full flex items-center justify-center text-4xl font-semibold !bg-slate-800 text-white pt-20">
					<p>Articles les plus recents : </p>
				</div>
				<div className="flex px-20 py-10 gap-16 md:flex-row md:flex-wrap !bg-slate-800 ms:flex-col sm:flex-col min-w-[10%]:flex-col ">
					{articlesHomePages.map((articlesHomePage) => (
						<div className="basis-1/4 shadow-lg px-10 pt-5  pb-16 rounded-sm my-5 !bg-slate-700  flex-1 text-white">
							<div className="flex-col gap-10 lg:flex-row lg:flex-wrap   h-full">
								<div
									key={articlesHomePage.id}
									className=" text-center  flex flex-col justify-center pb-O items-center "
								>
									<img
										src={articlesHomePage.urlToImage}
										className="rounded-sm object-cover"
										width="100%"
										height="100%"
										layout="responsive"
									/>
									<p className="py-1">
										Source:{" "}
										<span className="text-lg font-medium text-teal-600 py-1">
											{articlesHomePage.source.name}
										</span>
									</p>
									<p className="text-gray-89 py-1">{articlesHomePage.title}</p>
									<p className="text-gray-89 py-1 mb-2 text-justify text-lg font-medium max-w-2xl mx-auto">
										{articlesHomePage.description}
									</p>
								</div>
							</div>
							<div className="w-full h-auto flex items-center justify-center">
								<button class="bg-white hover:text-white hover:bg-sky-500/10 text-black font-semibold  p-2 rounded-md flex items-center justify-center hover:scale-105 ease-in duration-300 cursor-pointer shadow-lg shadow-black-10  mb-3 ">
									<a href={articlesHomePage.url}>
										<small>Read more ...</small>
									</a>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="flex items-center justify-center bg-slate-800 text-xl text-white pb-10">
					<p className=" text-lg">
						Allez à la page{"  "}
						<span className="cursor-pointer font-bold text-yellow-300">
							<Link href="/articles">article</Link>
						</span>
						{"  "}pour plus de contenu
					</p>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch("http://localhost:3000/api/articles");
	const articlesHomePages = await res.json();

	return {
		props: { articlesHomePages },
	};
}
