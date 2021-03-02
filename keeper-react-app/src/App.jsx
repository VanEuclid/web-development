import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

// function AppHeader() {
//     return <Header/>
// }

// function AppFooter() {
//     return <Footer/>
// }

// function AppNote() {
//     return <Note/>
// }

function App() {
    return (
        <div>
            <Header/>
            <Note/>
            <Footer/>
        </div>
    )
}

// export {AppHeader, AppFooter, AppNote};
export default App;
