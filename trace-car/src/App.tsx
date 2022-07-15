import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Item from "./pages/Item";
import MyPage from "./pages/MyPage";
import AuthToken from "./pages/AuthToken";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" >
					<Route index element={<Home />}/>
					<Route path="items" >
						<Route index element={<List />} />
						<Route path=":itemId" >
							<Route index element={<Item />} />
							<Route path="update" element={<Update/>}/>
						</Route>
						<Route path="create" element={<Create/>}/>
					</Route>
					<Route path="authtoken" element={<AuthToken/>}/>
					<Route path="mypage" element={<MyPage/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
