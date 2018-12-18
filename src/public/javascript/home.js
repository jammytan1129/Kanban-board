var vm = new Vue({
    el: '#creator_board',
    data: {                        
        title: 'Kanban',
        userInfo: {
            id: '',
            name: '',
            email: '',
            password: '',
            phone: '',
            nick_name: '',
            icon_url: '',
            board_list: []
        },
    },
    mounted() {
        $.ajax({
            type: 'GET',
            url: '/userInfo',
            success: userInfo => {
                this.userInfo = userInfo;
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
            const boardName = "new board";
            $.ajax({
                type: 'POST',
                url: '/createBoard',
                data: { boardName },
                success: board => {
                    this.userInfo.board_list.push(board);
                },
                error: function (xhr, textStatus, error) {
                    console.log(error);
                }
            });
        }
    }
})