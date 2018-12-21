var vm = new Vue({
    el: '#creator_board',
    data: {                        
        title: 'Kanban',
        boardTitle:'',
        loginUser: {},
        // userInfo: {
        //     id: '',
        //     name: '',
        //     email: '',
        //     password: '',
        //     phone: '',
        //     nick_name: '',
        //     icon_url: '',
        //     board_list: []
        // },
        isEditBoardTitle: false
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
            $.ajax({
                type: 'POST',
                url: '/createBoard',
                data: { boardName },
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