var vm = new Vue({
    el: '#board',
    name: 'mfgActivity',
    data: {  
        loginUser: {},                      
        comment: '',
        selected_card: {},        
        boardName: 'FirstBoard',
        boardId: '',
        board: {},
        isDesciptionEdit: false,
        originCardDescription: '',
        selected_stage_index: '',
        selected_card_index: '',
        move_from: {
            stage_index: -1,
            card_index: -1,
        },
        move_to: {
            stage_index: -1,
            card_index: -1,
        },
        addCardInStage: -1,
        editStageTitleIndex: -1,
        originStageTitle: '',
        EditStageWIPIndex: -1,
        originStageWIP: -1
    },
    mounted() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const path = url.pathname.split('/');
        this.boardId = path[2];
        this.FetchBoardDataById();
        
        $.ajax({
            type: 'GET',
            url: '/userInfo',
            success: userInfo => {
                this.loginUser = userInfo;
                console.log(this.loginUser.name + ': login');
            },
            error: function (xhr, textStatus, error) {
                console.log(error);
            }
        });

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
                console.log('Modify WIP limit for testing(FetchBoardDataById)');
                res.stage_list.forEach((stage, index) => {
                    stage.WIP_limit = index;
                });
            });
        },
        EditDescription: function() {
            this.isDesciptionEdit = true;
            this.originCardDescription = this.selected_card.description;
        },
        DoneEditDescription: function() {
            const data = this.getCardLocation;
            data.description = this.selected_card.description;
            this.PerformAjax('/updateDescription', data, function(res)  {

            });
            this.isDesciptionEdit = false;
            this.originCardDescription = '';
        },
        CancelEditDescription: function() {
            if (this.isDesciptionEdit) {
                this.selected_card.description = this.originCardDescription;
                this.isDesciptionEdit = false;
            }
        },
        EditStageTitle: function(stage_index) {
            this.editStageTitleIndex = stage_index;
            this.originStageTitle = this.board.stage_list[stage_index].title;
        },
        CancelEditStageTitle: function() {
            if (this.editStageTitleIndex != -1) {
                this.board.stage_list[this.editStageTitleIndex].title = this.originStageTitle;
                this.editStageTitleIndex = -1;
                this.originStageTitle = '';
            }
        },
        DoneEditStageTitle: function() {
            this.editStageTitleIndex = -1;
            this.originStageTitle = '';
        },
        EditStageWIP: function(stage_index) {
            this.EditStageWIPIndex = stage_index;
            this.originStageWIP = this.board.stage_list[stage_index].WIP_limit;
        },
        CancelEditStageWIP: function() {
            if (this.EditStageWIPIndex != -1) {
                this.board.stage_list[this.EditStageWIPIndex].WIP_limit = this.originStageWIP;
                this.originStageWIP = -1;
                this.EditStageWIPIndex = -1;
            }
        },
        DoneEditStageWIP: function() {
            if (this.board.stage_list[this.EditStageWIPIndex].WIP_limit < 0) {
                this.CancelEditStageWIP();
            } else {
                this.originStageWIP = -1;
                this.EditStageWIPIndex = -1;
            }
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
        SetSelectedLocation: function(stage_index, card_index) {
            this.selected_stage_index = stage_index;
            this.selected_card_index = card_index;
        },
        CleanSelectCache() {
            this.selected_card = {};
        },
        LoadCardContent: function (stage_index, work_item_index) {
            this.CleanSelectCache();
            this.SetSelectedLocation(stage_index, work_item_index);
            this.PerformAjax('/findCard', this.getCardLocation, (card) => {
                this.selected_card = card;
            });
        },
        AddNewCard: function (stage_index) {
            let cardTitle = $('#cardInput' + stage_index).val();
            
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

            this.HideCardInput();
        },
        ShowCardInput: function (stage_index) {
            this.addCardInStage = stage_index;
        },
        HideCardInput: function(stage_index) {
            this.addCardInStage = -1;
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
            };

            this.PerformAjax('/addNewStage', data, (stage) => {
                const numOfStages = this.board.stage_list.length;
                this.board.stage_list[numOfStages - 1] = stage;
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
                name:  this.loginUser.name,
                icon_url: this.loginUser.icon_url,
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
            // if(this.selected_card.assign.findIndex((id) => (id === member_index)) === -1) {
            //     this.selected_card.assign.push(member_index);
            // }
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
        },
        OnAdd(index) {
            this.move_to.stage_index = index;
        },
        OnStart(index) {
            this.move_from.stage_index = index;
        },
        getMoveCardId() {
            if (this.move_to.stage_index == -1)
                return this.board.stage_list[this.move_from.stage_index].work_items[this.move_to.card_index]._id;
            return this.board.stage_list[this.move_to.stage_index].work_items[this.move_to.card_index]._id;
        },
        isMoveStateClean() {
            return this.move_from.stage_index == -1 && this.move_from.card_index == -1 && this.move_to.stage_index == -1 && this.move_to.card_index == -1;
        },
        getMoveLocation() {
            if (this.isMoveStateClean())
                return;

            return {
                boardId: this.board._id,
                stage_index: this.move_from.stage_index,
                cardId: this.getMoveCardId(),
                start_stage_index: this.move_from.stage_index,
                start_card_index: this.move_from.card_index,
                end_stage_index: this.move_to.stage_index,
                end_card_index: this.move_to.card_index,  
            }
        },
        OnEnd(evt) {
            this.move_from.card_index = evt.oldIndex;
            this.move_to.card_index = evt.newIndex;
            // 沒有移動
            if (this.move_to.stage_index == -1 && this.move_from.card_index == this.move_to.card_index) 
                return;
            
            //console.log('from:' + JSON.stringify(this.move_from));
            //console.log('to: ' + JSON.stringify(this.move_to));

            this.PerformAjax('/moveCard', this.getMoveLocation(), function(res) {
                console.log('move successfully');
            });
            this.CleanMovingState();
        },
        CleanMovingState() {
            this.move_from.stage_index = -1;
            this.move_from.card_index = -1;
            this.move_to.stage_index = -1;
            this.move_to.card_index = -1;
        },
        IsPuttable(index) {
            if (this.board.stage_list.length > index && index >= 0) {
                const stage = this.board.stage_list[index];
                const limit = stage.WIP_limit;
                if (limit > 0 && limit <= stage.work_items.length) {
                    return false;
                }
            }
            return true;
        },
        MoveStage(evt) {
            /**
             * {
             *   boardId,
             *   stageId
             *   start_stage_index,
             *   end_stage_index
             * }
             */
            console.log(evt.oldIndex, evt.newIndex);
        }
    },
    computed: {
        getSelectedStageIndex: function() {
            return this.selected_stage_index;
        },
        getSelectedCardIndex: function() {
            return this.selected_card_index;
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