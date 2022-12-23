import { FaSistrix } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { supabase } from "../../utils/supabase";
import Layout from "../../layout/layout";
import React from "react";
import Head from "next/head";
import formateDate from "../../functions/formatDate";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function Article({ article, article2 }) {
	const currentUser = useUser();
	const createdDate = formateDate(article.created_at);
	console.log(article);
	console.log("Current User !", currentUser);

	async function handleSubmit(event) {
		event.preventDefault();

		const article_id = article.id;
		const content = event.target.addcomment.value;

		const body = {
			content,
			article_id,
			user_id: currentUser.id,
		};

		const { error } = await supabase.from("comments").insert(body);

		if (error) {
			console.log("Oups ! ", error.message);
		} else {
			console.log("Commentaire envoyé avec succès !");
		}
	}
	return (
		<>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				{/* <div id="top" className="pt-20">
					<div className="mx-auto bg-slate-900 w-full flex justify-center py-10">
						<div className="relative flex gap items-center max-w-sm w-full h-12 rounded-3xl focus-within:shadow-lg  overflow-hidden">
							<button className="grid place-items-center h-full w-12 text-gray-300 bg-white">
								<FaSistrix size={23} />
							</button>

							<input
								className="peer h-full w-full outline-none bg-white text-black text-md
						 		font-semibold pl-3"
								type="text"
								id="value"
								placeholder="Search something..."
							/>
						</div>
					</div>
				</div> */}
				<div className="container-article">
					<div className="article-div">
						<div className="author-left">
							<img
								src={article.profiles.avatar_url}
								className="rounded-sm object-cover"
								width="50px"
								height="50px"
								layout="responsive"
							/>
							<div className="flex column ml10 infos-author">
								<span>{article.profiles.full_name}</span>
								<span>{createdDate}</span>
							</div>
						</div>
						<div className="article-img">
							<h1 className="mt30 mb30">{article.title}</h1>
							<img src={article.imageUrl} layout="responsive" />
						</div>
						<div className="article-itself">
							<h2>{article.description}</h2>
							<div className="article-section">
								<p>{article.body}</p>
							</div>
						</div>
						<div className="add-comment">
							<div>
								<img src={currentUser.id} />
							</div>
							<form onSubmit={handleSubmit} className="form-comment">
								<textarea
									type="text"
									name="addcomment"
									placeholder="Ajouter un commentaire..."
								/>
								<button className="send-comment">
									<BiSend size={30} />
								</button>
							</form>
						</div>
						<div className="comments">
							{article.comments_view.map((comment) => (
								<div className="mb20 each-comment">
									<div className="comment-img">
										<img src={comment.avatar_author} layout="responsive" />
										<span className="ml20">{comment.name_author}</span>
									</div>
									<div className="mt10">{comment.content}</div>
								</div>
							))}
						</div>
					</div>
					<div className="user-div">
						<div className="mb50">
							<div className="user-right-img">
								<img src={article.profiles.avatar_url} layout="responsive" />
								<span className="ml20">{article.profiles.full_name}</span>
							</div>
							<div className="mt20">{article.profiles.description}</div>
						</div>
						<span>Découvrir plus</span>
						{article2.map((article) => (
							<Link href={`/articles/${article.id}`}>
								<div
									key={article.id}
									className="other-post flex space-between mt30"
								>
									<div className="col-9-sm">
										<div className="flex gap items-center">
											<img
												src={article.avatar_author}
												className="rounded-sm object-cover border-radius"
												width="30px"
												height="30px"
												layout="responsive"
											/>
											<small>{article.name_author}</small>
										</div>
										<h3>{article.description}</h3>
									</div>
									<div>
										<img
											src={article.imageUrl}
											className="rounded-sm object-cover"
											width="100px"
											height="100px"
											layout="responsive"
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</Layout>
		</>
	);
}

export async function getServerSideProps({ params }) {
	const { data: article, error } = await supabase
		.from("articles")
		.select("*, comments_view(*), profiles(*)")
		.eq("id", params.article)
		.single();

	const { data: article2, error2 } = await supabase
		.from("articles_view")
		.select("*")
		.order("created_at", { ascending: true })
		.limit(2);

	if (error || error2) {
		throw new Error("Error !");
	}

	return {
		props: {
			article,
			article2,
		},
	};
}
