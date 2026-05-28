import useHttp from '../hooks/http.hook' 

const useMarvelService = () => {

    const {loading,request,error,clearError} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComisc);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const fullThumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;
        const imageNotAvailable = fullThumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

        return {
            id:char.id,
            name: char.name,
            description: char.description,  
            thumbnail: fullThumbnail,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            thumbnailStyle: imageNotAvailable?{'objectFit':'contain'} : {'objectFit':'cover'},
            comics: char.comics.items
        }

    }

    const _transformComisc = (comic) =>{

        const fullThumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;

        return {
            id:comic.id,
            title: comic.title,
            description: comic.description,  
            thumbnail: fullThumbnail,
            price:`${comic.prices[0].price}$`
        }
    }

    return  {loading, error, clearError, getAllCharacters, getCharacter,getAllComics}
}

export default useMarvelService;