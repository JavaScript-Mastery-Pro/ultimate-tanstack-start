import { Heart } from "lucide-react";
import { useState } from "react";

type SkillCardProps = {
	name: string;
};

const SkillCard = ({ name }: SkillCardProps) => {
	const [liked, setLiked] = useState(false);
	const likes = liked ? 1 : 0;

	return (
		<article className="feature-card island-shell rise-in rounded-3xl p-5">
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-2">
					<p className="island-kicker">Skill</p>
					<h2 className="display-title text-2xl font-bold">{name}</h2>
					<p className="text-sm text-(--sea-ink-soft)">
						{likes} {likes === 1 ? "like" : "likes"}
					</p>
				</div>

				<button
					className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line) bg-(--surface-strong) text-(--sea-ink) shadow-md"
					onClick={() => setLiked((current) => !current)}
					type="button"
				>
					<Heart
						className={liked ? "fill-current text-(--lagoon-deep" : ""}
						size={18}
					/>
				</button>
			</div>
		</article>
	);
};

export default SkillCard;
