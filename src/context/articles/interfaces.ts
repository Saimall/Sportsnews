type data = {
    id : number;
    name : string;
  }
  
  export interface Article {
    id: number;
    title: string;
    teams:data[];
    thumbnail: string;
    summary : string;
    date: string;
    sport : data;
    }
    
    export interface ArticlesState {
      articles: Article[];
      isLoading: boolean;
      isError: boolean;
      errorMessage: string;
    }
    
    export const initialState: ArticlesState = {
      articles: [],
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
    
    export type ArticlesActions =
      | { type: "FETCH_ARTICLES_REQUEST" }
      | { type: "FETCH_ARTICLES_SUCCESS"; payload: Article[] }
      | { type: "FETCH_ARTICLES_FAILURE"; payload: string }