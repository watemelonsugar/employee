import InputDetails from './components/InputDetails';
import OtherDetails from './components/OtherDetails'
import DisplayDetails from './components/DisplayDetails';
import { Fragment, createContext ,useContext ,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const NameContext = createContext();

function App() {
  const [name, setName] = useState("");

  const handleName = (name) => {
    setName(name);
  };
  return (
    
    <Fragment>
      <Router>
      <NameContext.Provider value={{name,handleName}}>
          <Routes>
              <Route exact path="/" element={<InputDetails />} />
              <Route exact path="/otherdetails/:name" element={<OtherDetails />} />
              <Route exact path="/displayDetail" element={<DisplayDetails />} />
          </Routes>
      </NameContext.Provider>
       
      </Router>
    </Fragment>
  );
}

export function useName() {
  return useContext(NameContext);
}

export default App;
