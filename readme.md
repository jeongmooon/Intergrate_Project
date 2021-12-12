# 프로젝트 관련 주소
    1. 프로젝트 경과 주소
        - https://trello.com/b/aMBOpNcB/project-2021

    2. 참고 사이트
        - 몽고DB 공식문서 https://docs.mongodb.com/

        - express 게시판 참고
            - https://ganzicoder.tistory.com/65

            - CRUD
                - https://youngjinmo.github.io/2021/08/express-crud-rest-api/

        - password 보안관련(salt, crypto, hash)
            1) crypto 관련 사항들
                - https://www.zerocho.com/category/NodeJS/post/593a487c2ed1da0018cff95d

                - https://zinirun.github.io/2020/12/02/node-crypto-password/

                - https://velog.io/@tkdfo93/Node-Express-Crypto-%EB%AA%A8%EB%93%88%EC%9D%84-%ED%86%B5%ED%95%9C-%ED%95%B4%EC%8B%B1-Final-Project
            
            2) 여러번 비밀번호 틀릴 시 계정잠금?
                - User 스키마에 틀릴때마다 카운트올리고, bolean 디폴트값 false로 주고 true시 로그인불가능? 하게??

                - https://doorbw.tistory.com/38

                
        - 아이디 중복체크 관련
            - https://blog.naver.com/PostView.nhn?blogId=ks2414e&logNo=222183290304

    3. AWS
        - AWS 가입 포스팅
            - https://jungmina.com/m/888

        - AWS공식문서
            - https://aws.amazon.com/ko/quickstart/architecture/mongodb/

        - AWS에 몽고DB올린거 포스팅
            - https://snepbnt.tistory.com/393

        - AWS MySQL 유튜브영상
            - https://www.youtube.com/watch?v=wdaMD6yQVh4

        - AWS MongoDB 세팅 영상(외국어임)
            - https://www.youtube.com/watch?v=fhl8Ps7o0tk


# 12-13 서버 상태
1. 회원가입, 로그인라우터 만듬
<img src="https://user-images.githubusercontent.com/92348108/145719847-7ba7361e-1157-4884-a540-4b6b14718cb6.PNG" />


# 몽고DB 
1. db명 : projectadd

2. collection명 : users(회원가입), board(게시판)

3. 스키마
    1) user : email, name, password, createAt, salt, signinCount(계정카운트), lockAccount(계정잠금)
        - user 스키마 내용
        - email은 고유키로 받음, createAt는 가입한시간
        - salt라고 비밀번호 보안관련 있음 가능하면 해볼 예정
            - https://st-lab.tistory.com/100

    2) board : writer, title, content, createAt
        - board 스키마 내용
        - writer는 외부키로 user스키마에서 objectid를 받아 와서 만듬

        - 추후에 이미지URL이나 이런거도 추가해야함

4. 라우터
    1) memberRouter : 회원가입, 로그인, 로그아웃, 유저삭제, 유저수정, 정보추가?
        - 회원가입 : 중복체크 만들어볼 예정
        - 로그인 : 이메일 값으로 아이디 중복확인, 로그인 n회 실패시 아이디 잠금?
