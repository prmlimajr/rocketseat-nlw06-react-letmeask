import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParams = {
	id: string;
};

export function AdminRoom() {
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions, title } = useRoom(roomId);
	const history = useHistory();

	const handleCheckQuestionAsAnswered = async (questionId: string) => {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true,
		});
	};

	const handleHighlightQuestion = async (questionId: string) => {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: true,
		});
	};

	const handleDeleteQuestion = async (questionId: string) => {
		if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	};

	const handleEndRoom = async () => {
		database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push('/');
	};

	return (
		<div id="page-room">
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />

					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar sala
						</Button>
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>

					<span>
						{questions.length && questions.length === 1
							? `${questions.length} pergunta`
							: `${questions.length} perguntas`}
					</span>
				</div>

				<div className="question-list">
					{questions.map((question) => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
								isAnswered={question.isAnswered}
								isHighligthed={question.isHighlighted}
							>
								{!question.isAnswered && (
									<>
										<button
											type="button"
											onClick={() => handleCheckQuestionAsAnswered(question.id)}
										>
											<img src={checkImg} alt="Marcar pergunta" />
										</button>

										<button
											type="button"
											onClick={() => handleHighlightQuestion(question.id)}
										>
											<img src={answerImg} alt="Responder pergunta" />
										</button>
									</>
								)}

								<button
									type="button"
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deleteImg} alt="Remover pergunta" />
								</button>
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}
