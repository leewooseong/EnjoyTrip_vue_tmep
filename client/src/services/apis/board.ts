import axios from 'axios'

interface ListRequest {
  pageToMove: number
  shownArticleNum: number
  searchCategory: string
  searchWord: string
}
export const getArticleList = async (args: ListRequest) => {
  // axios.get 요청 시 body로 인자를 넣으려고하면 매개변수 에러가 발생한다.
  // -> 임시 방편으로 fetch를 이용해서 문제 해결
  // -> postman에 명세된 내용을 query param으로 받아서 처리해야 한다.
  // -> fetch도 get 요청에 body 작성 시 브라우저에서 get 요청 시 body를 작성할 수 없다고 에러 발생
  // const apiRes = await fetch('/board/qna/list', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     credentials: 'include'
  //   },
  //   body: JSON.stringify(args)
  // })

  // console.log('글 목록 조회 api 실행!!')
  // console.log(await apiRes.json())
  // return await apiRes.json()

  return [
    {
      articleNo: 100,
      subject: '안녕하세요1',
      userId: 'ssafy',
      userName: '김싸피',
      hit: 123,
      registerDate: '25.12.25'
    },
    {
      articleNo: 99,
      subject: '안녕하세요2',
      userId: 'admin',
      userName: '관리자',
      hit: 100,
      registerDate: '25.12.24'
    },
    {
      articleNo: 98,
      subject: '안녕하세요3',
      userId: 'parkssafy',
      userName: '박싸피',
      hit: 78,
      registerDate: '24.12.31'
    },
    {
      articleNo: 97,
      subject: '안녕하세요4',
      userId: 'ssafy',
      userName: '김싸피',
      hit: 33,
      registerDate: '24.12.20'
    },
    {
      articleNo: 96,
      subject: '내 생일이에요!!!',
      userId: 'ssafy',
      userName: '김싸피',
      hit: 1004,
      registerDate: '23.12.20'
    }
  ]
}

export const getArticleItem = async (articleId: number) => {
  // const apiRes = await axios.get(`board/qna/article/${articleId}`)
  // console.log(apiRes.data)
  return {
    articleId: 100,
    title: '안녕하세요 뷰테스트 중입니다.',
    content:
      '뷰테스트 중입니다. 컴포넌트 연습하고 있으며, 앞으로 props와 custom event를 처리 할 예정입니다!!!',
    userId: 'ssafy',
    userNick: '김싸피',
    hit: 123,
    UpdateDate: '25.01.01'
  }
}

export const writeArticleItem = async (args: any): Promise<boolean> => {
  // const apiRes = await axios.post(`board/qna/article`, {...args})
  // console.log(apiRes.data)
  console.log('글 작성 api 실행!!')
  return true
}

export const updateArticleItem = async (articleId: number): Promise<boolean> => {
  // const apiRes = await axios.put(`board/qna/article`, {articleId})
  // console.log(apiRes.data)
  console.log('글 수정 api 실행!!')
  return true
}

export const deleteArticleItem = async (articleId: number): Promise<boolean> => {
  // const apiRes = await axios.put(`board/qna/article`, {articleId})
  // console.log(apiRes.data)
  console.log('글 삭제 api 실행!!')
  return true
}
