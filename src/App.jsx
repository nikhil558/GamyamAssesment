import { Provider } from "react-redux";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import appStore from "./Redux/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Header />
        <Body />
        <Footer />
      </Provider>
    </>
  );
}

export default App;
