import { ISettings } from '../../interface/ISettings';
import { Editor } from 'tinymce';

interface IRequestOptions {
  mode: string
  settings: ISettings
  apiKey: string
  prompt: string[],
  editor: Editor,
  startCallback?: (editor: Editor, mode: string) => void
  completeCallback: (editor: Editor, mode: string, settings:ISettings) => void
  progressCallback: (editor: Editor, mode: string, rep: string) => void
  requestErrorCallback: (editor: Editor, mode: string, error: IError) => void

}

interface IAjaxOptions {
  url: string
  data?: string
  dataType: string
  apiKey: string
  sync: boolean
}

interface IRequestAjaxResponse {
  requestAjaxConfig: IAjaxOptions,
  requestAjaxResponseText: string,
  requestAjaxResponseStatus: number
}

interface IModerationCategories {
  "hate": boolean,
  "hate/threatening": boolean,
  "self-harm": boolean,
  "sexual": boolean,
  "sexual/minors": boolean,
  "violence": boolean,
  "violence/graphic": boolean,
}

interface IModerationCategoriesScores {
  "hate": number,
  "hate/threatening": number,
  "self-harm": number,
  "sexual": number,
  "sexual/minors": number,
  "violence": number,
  "violence/graphic": number,
}


interface IModerationResponse {
  id: string
  model: string
  flagged: boolean
  categories: IModerationCategories,
  category_scores:IModerationCategoriesScores
}

interface IError {
  errorType: string
  message: string
  message2?: string
  moderationResponse?: IModerationResponse
  requestAjaxResponse?: IRequestAjaxResponse
  openAIError?: IOpenAIError
}

interface IOpenAIError {
  message: string
  type: string
  param: string
  code: string
}
interface ISSERequest {
  url: string
  apiKey: string
  mode: string
  payload?: string
}

export {
  IRequestOptions,
  IAjaxOptions,
  IModerationCategories,
  IModerationCategoriesScores,
  IModerationResponse,
  IError,
  IOpenAIError,
  ISSERequest,
  IRequestAjaxResponse
}