var vm = new Vue({
    el: '#board',
    name: 'mfgActivity',
    data: {                        
        comment: '',
        selected_card: {},        
        boardName: 'FirstBoard',
        boardId: '',
        board: {},
        isDesciptionEdit: false
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
        GetStageLocation: function(stage_index) {
            const data = {
                boardId: this.boardId,
                stageId: this.board.stage_list[stage_index]._id
            }
            return data;
        },
        FetchBoardDataById: function() {
            const path = '/fetchBoardDataById';
            const data =  {id: this.boardId};
            this.PerformAjax(path, data, (res) => {
                this.board = res;
            });
        },
        EditDescription: function() {
            console.log('editing');
            this.isDesciptionEdit = true;
        },
        DoneEditDescription: function() {
            this.isDesciptionEdit = false;
        },
        CancelEditDescription: function() {
            this.isDesciptionEdit = false;
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
            console.log(this.selected_card._id);
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
                console.log(this.board.stage_list[stage_index].work_items[numOfCards - 1]);
                console.log('add new card successfully');
            })
        },
        ShowCardInput: function (stage_index) {
            $('#cardInput' + stage_index).show();
            $('#cardInputButton' + stage_index).show();                
        },
        UpdateDescription: function () {
            const data = this.getCardLocation;
            data.description = $('#description').val();
            this.selected_card.description = data.description;
            console.log($('#description').val());
            console.log('update descirpiot');
            this.PerformAjax('/updateDescription', data, function(res)  {

            });
            this.DoneEditDescription();
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
            const comment = $('#comment-textarea').val();
            if (comment == '')
                return;

            $('#comment-textarea').val('');

            const data = this.getCardLocation;
            data.text = comment;
            this.PerformAjax('/leaveComment', data, function(board) {
                console.log(board);
            });

            this.selected_card.comments.splice(0, 0, {
                user_id: 2,
                text: comment,
                date: this.GetCurrentTime()
            });
        },
        RemoveCard:function(stage_index){ 
            this.PerformAjax('/removeCard', this.getCardLocation, (res) => {
                console.log("remove card successfully");
            });
            
            this.board.stage_list[this.getSelectedStageIndex].
                work_items.splice(this.getSelectedCardIndex, 1);
            
        },
        RemoveStage:function(stage_index){
            this.PerformAjax('/removeStage', this.GetStageLocation(stage_index), (res) => {
                if (stage_index = res) {
                    console.log("remove stage successfully.");
                }
            })
            this.board.stage_list.splice(stage_index, 1);
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
        },
        getCardLocation: function() {
            const data = {
                boardId: this.boardId,
                stage_index: this.getSelectedStageIndex,
                cardId: this.board.stage_list[this.getSelectedStageIndex].work_items[this.getSelectedCardIndex]._id
            };
            return data;
        }
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus()
            }
        }
    }
})