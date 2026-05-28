import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from '../comicsList/ComicsList'

import decoration from '../../resources/img/vision.png';

import { useState } from "react";


const App = () => {
    
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) =>{
        setSelectedChar(id);
    }
    

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ComicsList/>

                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>

                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected ={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                </div>
            </main>
        </div>
    )
}

export default App;