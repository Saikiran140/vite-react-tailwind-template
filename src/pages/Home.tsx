import Message from "~/Components/Message";
import ChatForm from "~/Components/ChatForm";
import { ChatFormProvider } from "~/Providers/ChatFormContext";


const Home = () => {

	return (
		<ChatFormProvider>
			<div className="flex flex-col w-fit mx-auto h-screen justify-center items-center">

				<Message />
				<ChatForm />
			</div>
		</ChatFormProvider>

	);
};

export default Home;
