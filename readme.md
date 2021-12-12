# 프로젝트 진행경과 주소
        - https://trello.com/b/aMBOpNcB/project-2021

    1. 참고 사이트
        - 몽고DB 공식문서 https://docs.mongodb.com/

        - express 게시판 참고
            - https://ganzicoder.tistory.com/65

            - CRUD
            https://youngjinmo.github.io/2021/08/express-crud-rest-api/

    2. AWS
        - AWS 가입 포스팅
            - https://jungmina.com/m/888
            
        - AWS공식문서
            - https://aws.amazon.com/ko/quickstart/architecture/mongodb/

        - AWS에 몽고DB올린거 포스팅
            - https://snepbnt.tistory.com/393

        - AWS MySQL 유튜브영상
            - https://www.youtube.com/watch?v=wdaMD6yQVh4

        - AWS MongoDB 세팅 영상(영어임)
            - https://www.youtube.com/watch?v=fhl8Ps7o0tk


# 몽고DB 
1. db명 : projectadd

2. collection명 : users(회원가입), board(게시판)

3. 스키마
    1) user : email, name, password, createAt, salt?
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
