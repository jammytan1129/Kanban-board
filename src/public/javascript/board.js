var vm = new Vue({
    el: '#board',
    name: 'mfgActivity',
    data: {                        
        comment: '',
        selected_card: {},        
        boardName: 'FirstBoard',
        boardId: '',
        board: {},
    },
    mounted() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const path = url.pathname.split('/');
        this.boardId = path[2];
        this.FetchBoardDataById();
    },
    watch: {

    },
    methods: {
        FetchBoardDataById: function() {
            const path = '/fetchBoardDataById';
            const data =  {id: this.boardId};
            this.PerformAjax(path, data, (res) => {
                this.board = res;
            });
        },
        // AddNewMember: function () {
        //     let email = $('#member-email').val();
        //     $('#member-email').val('');
        //     console.log(email);
        //     this.members.push({
        //         name: 'Peter',
        //         email:'peter@gmail.com',
        //         phone: '0912345677',
        //         nick_name: '小p',
        //         icon_url: 'public/icon/profile/001-man.png'
        //     });
        // },
        LoadCardContent: function (stage_index, work_item_index) {
            this.selected_card = this.board.stage_list[stage_index].work_items[work_item_index];
            this.selected_card.stage_index = stage_index;
            this.selected_card.card_index = work_item_index;
        },
        AddNewCard: function (stage_index) {
            let cardTitle = $('#cardInput' + stage_index).val();
            
            $('#cardInput' + stage_index).css('display', 'none');
            $('#cardInputButton' + stage_index).hide();
            if(cardTitle == '') return
            this.board.stage_list[stage_index].work_items.push({
                title: cardTitle
            });
            const data = {
                boardId: this.boardId,
                stage_index: stage_index,
                cardTitle: cardTitle
            }
            this.PerformAjax('/addNewCard', data, (card) => {
                const numOfCards = this.board.stage_list[stage_index].work_items.length;
                this.board.stage_list[stage_index].work_items[numOfCards - 1] = card;
                console.log('add new card successfully');
            })
        },
        ShowCardInput: function (stage_index) {
            $('#cardInput' + stage_index).show();
            $('#cardInputButton' + stage_index).show();                
        },
        UpdateComment: function () {
            this.selected_card.description = $('#description').val();
            $('#description').val('');
        },
        AddNewStage: function () {
            this.board.stage_list.push({
                title: "New Stage",
                WIP_limit: 0,
                work_items: []
            });
            const data = {
                boardId: this.boardId,
                stageTitle: "New Stage"
            }
            this.PerformAjax('/addNewStage', data, (stage) => {
                const numOfStages = this.board.stage_list.length;
                this.board.stage_list[numOfStages - 1] = stage;
                console.log(this.board.stage_list);
                console.log("add new stage successfully.");
            });
        },
        GetCurrentTime: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '/' + mm + '/' + dd;
            return today;
        },
        PostComment: function () {
            let comment = $('#comment-textarea').val();
            $('#comment-textarea').val('');

            this.selected_card.comments.splice(0, 0, {
                user_id: 2,
                content: comment,
                datetime: this.GetCurrentTime()
            });

        },
        RemoveCard:function(stage_index){
            this.board.stage_list[this.getSelectedStageIndex].
                work_items.splice(this.getSelectedCardIndex, 1);
            const data = {
                boardId: this.boardId,
                stage_index: this.getSelectedStageIndex,
                work_item_index: this.getSelectedCardIndex
            };
            this.PerformAjax('/removeCard', data, (res) => {
                console.log("remove card successfully");
            });
        },
        RemoveStage:function(stage_index){
            this.board.stage_list.splice(stage_index, 1);
            const data = {
                boardId: this.boardId,
                stage_index
            }
            this.PerformAjax('/removeStage', data, (res) => {
                if (stage_index = res) {
                    console.log("remove stage successfully.");
                }
            })
        },
        RemoveMember:function(member_index){
            this.members.splice(member_index, 1);
        },
        AssignMember:function(member_index) {
            if(this.selected_card.assign.findIndex((id) => (id === member_index)) === -1) {
                this.selected_card.assign.push(member_index);
            }
        },
        PerformAjax: function(path, data, callback) {
            $.ajax({
                type: 'POST',
                url: path,
                data: data,
                success: response => {
                    callback(response);
                },
                error: function (xhr, textStatus, error) {
                    console.log(error);
                }
            });
        }
    },
    computed: {
        getSelectedStageIndex: function() {
            return this.selected_card.stage_index;
        },
        getSelectedCardIndex: function() {
            return this.selected_card.card_index;
        }
    }
})