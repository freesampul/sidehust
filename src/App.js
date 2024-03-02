import { React } from "React";

import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Chat from "./routes/chat/chat.component";
import UserPage from "./routes/users/users.component";
import Payment from "./components/payment/payment.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="chat" element={<Chat />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Payment />} />
        <Route path="user/*" element={<UserPage />} />
      </Route>
    </Routes>
  );
};

export default App;
