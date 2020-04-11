var vm = new Vue({
    el: '#home',
    data: {                        
        boardTitle:'',
        loginUser: {},
        board: {
            name: 'Kanban',
        },
        isEditBoardTitle: false,
        background_urls: [
            "/public/images/2018-abstract-art-285173.jpg",
            "/public/images/abstract-abstract-expressionism-abstract-painting-1145720.jpg",
            "/public/images/abstract-art-artistic-290617.jpg",
            "/public/images/background-blur-bokeh-220067.jpg",
            "/public/images/blur-dark-electricity-114751.jpg"
        ],
        // background_url: '/public/images/abstract-abstract-expressionism-abstract-painting-1145720.jpg'
    },
    mounted() {
        $.ajax({
            type: 'GET',
            url: '/userInfo',
            success: user => {
                this.loginUser = user;
            },
            error: function (xhr, textStatus, error) {
                console.log(error);
            }
        });
    },
    methods: {      
        selectBoard:function(boardFk){
            window.location.href = `/board/${boardFk}`; 
        },
        createBoard: function() {
            const boardName = this.boardTitle;
            this.boardTitle = '';

            const random = Math.floor(Math.random() * this.background_urls.length);
            let background_url = this.background_urls[random];
            console.log(background_url);           

            $.ajax({
                type: 'POST',
                url: '/createBoard',
                data: { 
                    boardName,
                    background_url
                 },
                success: board => {
                    this.loginUser.board_list.push(board);
                },
                error: function (xhr, textStatus, error) {
                    console.log(error);
                }
            });
        },
        EditBoardTitle: function() {

        },
        CancelEditBoardTitle: function() {

        },
        DoneEditBoardTitle: function() {
            
        }
    }
})
