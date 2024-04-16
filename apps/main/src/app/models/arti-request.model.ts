export interface ArtiRequest {
  code: string
  mode: 'summarize' | 'optimize' |  'analyze' |  'advanced'
  language:  string;
  userInput: string;
}
