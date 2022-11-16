import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home({ articlesHomePages }) {
	return (
		<div>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="w-full h-screen text-center">
				<div className=" w-full mx-auto flex justify-center">
					<div className="w-full h-10 bg-white p-10 ">
						<p className="font-semibold text-2xl ">Notre blog</p>
						<p className="my-2 text-lg">
							Bonjour, nous sommes Abessolo et Affadjene, étudiants à
							l'ECE-Paris, Nous vous présentons notre blog!
						</p>
					</div>
				</div>
				<div className="w-full h-3/4 flex items-center justify-center">
					<h2 className="">In progress...</h2>
				</div>
				<div></div>

				<div className="info">
					<div className="Rova">
						<div className="photo"></div>
						<div className="info"></div>
					</div>
					<div className="Navil">
						<div className="photo"></div>
						<div className="info"></div>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-center text-4xl font-semibold text-slate-900 my-4">
				<p>Quelques articles : </p>
			</div>
			<div className="flex px-20 py-10 gap-16 md:flex-row md:flex-wrap !bg-slate-800 ms:flex-col sm:flex-col min-w-[10%]:flex-col ">
				{articlesHomePages.map((articlesHomePage) => (
					<div className="basis-1/4 shadow-lg px-10 pt-5  pb-8 rounded-sm my-5  flex-1 bg-stone-300">
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
						<div className="w-full h-auto flex items-center justify-center mb-2">
							<button class="bg-sky-500 hover:bg-sky-500/50 text-white  p-0.5 rounded-sm flex items-center justify-center hover:scale-105 ease-in duration-300 cursor-pointer shadow-lg shadow-black-10  mb-2 ">
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
	);
}

export async function getStaticProps() {
	const res = await fetch("http://localhost:3000/api/articles");
	const articlesHomePages = await res.json();

	return {
		props: { articlesHomePages },
	};
}
