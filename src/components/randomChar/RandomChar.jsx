import {useEffect, useState} from 'react'
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const marvelService = new MarvelService();

const RandomChar = () =>{

    const [char,setChar] = useState({});
    const [loading,setLoading]  = useState(false);
    const [error,setError] = useState(false);

    

    const onCharLoaded = (char) =>{
        setChar(char);
        setLoading(false);
        setError(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () =>{
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {

        onCharLoading();
        const id = Math.floor(Math.random() * (20-1) + 1);

        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
        
        
    }

    useEffect(()=>{
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    },[])

    const formatDescription = (description) => {
        if(!description){
           return 'There is no description for this character';
        }
        if(description.length >200){
           return `${description.slice(0,200)}...`;
        }
        return description
    }

    {
        const errorMessage = error ? <ErrorMessage/>  : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char = {char} formatDesc={formatDescription}/> : null
 
        return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick = {updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    }
    
}

const View = ({char,formatDesc}) => {
    const {name,description,thumbnail,homepage,wiki,thumbnailStyle} = char;
    let  desc = formatDesc(description);

    return (
        <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" style={thumbnailStyle} className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr"> {desc}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;