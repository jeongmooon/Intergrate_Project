# 몽고DB 
1. db명 : projectadd
2. collection명 : users(회원가입), board(게시판)
3. 스키마
    1) user : email, name, password, createAt
        - user 스키마 내용
        - email은 고유키로 받음, createAt는 가입한시간

    2) board : writer, title, content, createAt
        - board 스키마 내용
        - writer는 외부키로 user스키마에서 objectid를 받아 와서 만듬

        - 추후에 이미지URL이나 이런거도 추가해야함

