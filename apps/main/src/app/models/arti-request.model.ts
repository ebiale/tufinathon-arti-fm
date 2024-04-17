export interface ArtiRequest {
  code: string
  mode: 'summarize' | 'optimize' |   'advanced'
  language:  string;
  userInput: string;
}
