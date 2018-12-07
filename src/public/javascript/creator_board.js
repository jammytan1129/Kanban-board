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
    watch: {

    },
    methods: {
        selectBoard:function(){
            console.log("sdfds");
        },
        createBoard: function() {
            const boardName = "new board";
            $.ajax({
                type: 'POST',
                url: '/createBoard',
                data: { boardName },
                success: boardID => {
                    this.userInfo.board_list.push({boardFk: boardID});
                    this.fetchUserBoards();
                },
                error: function (xhr, textStatus, error) {
                    console.log(error);
                }
            });
        },
        fetchUserBoards: function() {
            $.ajax({
                type: 'POST',
                url: '/fetchUserBoards',
                data: {board_list: this.userInfo.board_list},
                success: boards => {
                    console.log(boards);
                },
                error: function (xhr, textStatus, error) {
                    console.log(error);
                }
            });
        }
    }
})