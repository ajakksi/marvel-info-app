import {Component} from 'react'
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component{
    constructor(props){
        super(props);
        this.updateChar();
    }

    state = {
        char:{},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) =>{
        this.setState({char, loading:false})
    }

    onError = () =>{
        this.setState({loading:false,error: true})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (20-1) + 1);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
        
        
    }

    formatDescription = (description) => {
        if(!description){
           return 'There is no description for this character';
        }
        if(description.length >200){
           return `${description.slice(0,200)}...`;
        }
        return description
    }

    render(){
        const {char, loading,error} = this.state;
        const errorMessage = error ? <ErrorMessage/>  : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char = {char} formatDesc={this.formatDescription}/> : null
 
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
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    }
    
}

const View = ({char,formatDesc}) => {
    const {name,description,thumbnail,homepage,wiki} = char;
    let  desc = formatDesc(description);

    return (
        <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
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