import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import formateDate from "../../functions/formatDate";
import Layout from "../../layout/layout";
import { supabase } from "../../utils/supabase";
import Link from "next/link";

export default function ProfilePage({ profile }) {
	console.log(profile);
	const user = useUser();
	return (
		<>
			<Head>
				<title>Profile</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<div className="container-article dark:text-white/80">
					<div className="article-div">
						<div className="profile-banner">
							<img
								src="https://png.pngtree.com/thumb_back/fh260/back_pic/02/66/55/50578b1ecd8c4ae.jpg"
								layout="responsive"
							/>
							<h2>{profile ? profile.full_name : "Chargement..."}</h2>
							<p>Articles</p>
						</div>
						<div className="contain-articles dark:bg-slate-800">
							{profile ? (
								profile.articles ? (
									profile.articles.map((article) => (
										<Link href={`/articles/${article.id}`}>
											<div
												key={article.id}
												className="mb20 cursor-pointer article-box"
											>
												<div>
													<p className="mb10 text-zinc-400">
														{formateDate(article.created_at)}
													</p>
													<h3 className="dark:text-sky-500 ">
														{article.title}
													</h3>
													<p>{article.body.slice(0, 200) + "..."}</p>
												</div>

												<div>
													<img src={article.imageUrl} layout="responsive" />
												</div>
											</div>
										</Link>
									))
								) : (
									<h2>Aucun article</h2>
								)
							) : (
								<h2>Chargement...</h2>
							)}
						</div>
					</div>
					<div className="user-div">
						<div className="mb50">
							<div className="user-right-img">
								<img src={profile.avatar_url} layout="responsive" />
								<span className="ml20 text-sky-500">
									{profile ? (
										<h2> {profile.full_name} </h2>
									) : (
										<h2>Chargement...</h2>
									)}
								</span>
							</div>
							{profile ? (
								<div className="mt20 mb30 ">
									<p className="pb-4 text-sky-300">{"@" + profile.username} </p>
									<p> {profile.description} </p>
								</div>
							) : (
								<h2>Chargement...</h2>
							)}

							{user?.id === profile.user_id && (
								<Link href="/profile/update">
									<span className="cursor-pointertext-2xl text-lg text-orange-500">
										Modifier mes informations
									</span>
								</Link>
							)}
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export async function getServerSideProps({ params }) {
	const { data: profile, error } = await supabase
		.from("profiles")
		.select("*, articles(*)")
		.eq("user_id", params.profile)
		.single();

	if (error) {
		throw new Error("Error");
	}

	return {
		props: {
			profile,
		},
	};
}