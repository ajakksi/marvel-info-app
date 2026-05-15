import './charList.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error:false
    }

    marvelService = new MarvelService();

    componentDidMount(){
       this.onCharListLoading();

        this.marvelService
            .getAllCharacters()
            .then(this.charListLoaded)
            .catch(this.onError)
    }

    charListLoaded = (charList) => {

        this.setState({charList,  loading:false});
    }
    onCharListLoading = () => {
        this.setState({loading:true});
    }

    onError = () =>{
        this.setState({loading:false,error: true})
    }

    contentLoaded = (charList) =>{
         const items =  charList.map(item=>{
            return (
                <li className="char__item" key={item.id}>
                    <img src={item.thumbnail} alt="abyss" style={item.thumbnailStyle}/>
                    <div className="char__name">{item.name}</div>
                    
                </li>
            )
        })

          return (
            <ul className="char__grid">
                {items}
            </ul>
        )

        
    }

    render(){
        const {charList, loading,error} = this.state;

        const items = this.contentLoaded(charList)

        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/>  : null
        const content = !(loading || error) ? items : null

       

        return (
        <div className="char__list">
             {spinner}
             {errorMessage}
             {content}
            
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;