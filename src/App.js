import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProviderContext } from "./components/Tools/CreateContext";

function App() {
  const [achat, setAchat] = useState({type:null,count:null});
  const updateAchat = (value)=>{
    setAchat(value)
  }
  return (
    <div>
      <ProviderContext.Provider value={{achat,updateAchat}}>
        <Header />

        <Outlet />
        
        <Footer />
      </ProviderContext.Provider>
    </div>
  );
}

export default App;
