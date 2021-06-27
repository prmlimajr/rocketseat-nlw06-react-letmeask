import React, { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/questions.scss';

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	children?: ReactNode;
	isAnswered?: boolean;
	isHighligthed?: boolean;
};

export function Question({
	content,
	author,
	children,
	isAnswered = false,
	isHighligthed = false,
}: QuestionProps) {
	return (
		<div
			className={cx(
				'question',
				{ answered: isAnswered },
				{ highlighted: isHighligthed && !isAnswered }
			)}
		>
			<p>{content}</p>

			<footer>
				<div className="user-info">
					<img src={author.avatar} alt={author.name} />

					<span>{author.name}</span>
				</div>

				<div>{children}</div>
			</footer>
		</div>
	);
}
