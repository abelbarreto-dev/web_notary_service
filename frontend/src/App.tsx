import { Routes, Route } from "react-router-dom";
import { SingIn } from "./pages/SingIn";
import { SingUp } from "./pages/SingUp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SingIn />} />
            <Route path={"/sing-up"} element={<SingUp />} />
        </Routes>
    );
}

export default App;
