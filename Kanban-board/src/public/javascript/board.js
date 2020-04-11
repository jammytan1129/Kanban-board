
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
        editStageWIPIndex: -1,
        originStageWIP: -1,
        editStageColorIndex: -1,
        styleObject:{
            color: 'red',
        },
        // colorList: [
        //     '#FF0000', '#FF8800', '#FFFF00', 
        //     '#77FF00', '#00FF99', '#00FFFF', 
        //     '#0066FF', '#5500FF', '#9900FF', 
        //     '#FF00FF', '#888888', '#FFFFFF'
        // ],
        colorList: [
            '#ff0000', '#ff4000', '#ff8000', 
            '#ffbf00', '#ffff00', '#bfff00', 
            '#80ff00', '#40ff00', '#00ff00', 
            '#00ff40', '#00ff80', '#00ffbf',
            '#00ffff', '#00bfff', '#0080ff', 
            '#0040ff', '#0000ff', '#4000ff', 
            '#8000ff', '#bf00ff', '#ff00ff', 
            '#ff00bf', '#ff0080', '#ff0040',
            '#ff0000', '#fff', '#777', '#000'
        ],
        isEditBoardTitle: false,
        originBoardTitle: '',
        newMemberEmail: '',
        selectColorIndex: -1,
        labelText: ''
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
                console.log(res)
            });
        },
        EditDescription: function() {
            this.isDesciptionEdit = true;
            this.originCardDescription = this.selected_card.description;
        },
        DoneEditDescription: function() {
            this.getSelectedCard.description = this.selected_card.description;
            if (this.selected_card.description != this.originCardDescription) {
                const data = this.getCardLocation;
                data.description = this.selected_card.description;
                this.originCardDescription = '';
                this.PerformAjax('/updateDescription', data, function(res) {
                });
            }
            this.UpdateDescriptionEdit();
        },
        CancelEditDescription: function() {
            if (this.isDesciptionEdit) {
                this.selected_card.description = this.originCardDescription;
                this.UpdateDescriptionEdit();
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
            if (this.board.stage_list[this.editStageTitleIndex].title.trim() == '') {
                this.CancelEditStageTitle();
                return;
            }
            this.UpdateStage(this.editStageTitleIndex);
            this.editStageTitleIndex = -1;
            this.originStageTitle = '';
        },
        isEditCurrentStageTitle: function(stage_index) {
            return this.editStageTitleIndex == stage_index;
        },
        EditStageWIP: function(stage_index) {
            this.editStageWIPIndex = stage_index;
            this.originStageWIP = this.board.stage_list[stage_index].WIP_limit;
            // this.board.stage_list[stage_index].WIP_limit = '';
        },
        CancelEditStageWIP: function() {
            if (this.editStageWIPIndex != -1) {
                this.board.stage_list[this.editStageWIPIndex].WIP_limit = this.originStageWIP;
                this.originStageWIP = -1;
                this.editStageWIPIndex = -1;
            }
        },
        DoneEditStageWIP: function() {
            const stage = this.board.stage_list[this.editStageWIPIndex];
            if (stage.WIP_limit < 0 || stage.WIP_limit.trim() == '') {
                this.CancelEditStageWIP();
            } else {
                this.UpdateStage(this.editStageWIPIndex);
                this.originStageWIP = -1;
                this.editStageWIPIndex = -1;
            }
        },
        isEditCurrentStageWIP: function(stage_index) {
            return this.editStageWIPIndex == stage_index;
        },
        EditStageColor: function(stage_index) {
            this.editStageColorIndex = stage_index;
        },
        DoneEditStageColor: function(color) {
            const stage = this.board.stage_list[this.editStageColorIndex];
            console.log(this.editStageColorIndex, color)
            if (stage.border_color != color) {
                stage.border_color = color;
                this.$forceUpdate();
                this.UpdateStage(this.editStageColorIndex);
            }
            this.editStageColorIndex = -1;            
        },
        UpdateStage: function(stage_index) {
            const stage = this.board.stage_list[stage_index];
            const data = {
                boardId: this.boardId,
                stageId: stage._id,
                WIP_limit: stage.WIP_limit,
                title: stage.title,
                border_color: stage.border_color
            }
            this.PerformAjax('/editStage', data, (stage) => {

            });
        },
        EditBoardTitle: function() {
            this.isEditBoardTitle = true;
            this.originBoardTitle = this.board.name;
        },
        CancelEditBoardTitle: function() {
            if (this.isEditBoardTitle) {
                this.board.name = this.originBoardTitle;
                this.isEditBoardTitle = false;
            }
        },
        DoneEditBoardTitle: function() {
            if (this.board.name.trim() == '')
                this.CancelEditBoardTitle();
            this.isEditBoardTitle = false;
        },
        AddMember: function () {
            if (this.newMemberEmail.trim() == '') {
                this.newMemberEmail = '';
                return;
            }
            const index = this.board.members.findIndex((member) => (member.email == this.newMemberEmail));
            if (index == -1) {
                const data = {
                    boardId: this.boardId,
                    email: this.newMemberEmail         
                }
                this.PerformAjax('/inviteMember', data, (member) => {
                    if (member) {
                        this.board.members.push(member);
                        console.log('invite member successfully');
                    } else {
                        console.log('email not exist');
                    }
                });
            } else {
                console.log(`${this.newMemberEmail} has already in board`);                
            }
            this.newMemberEmail = '';
        },
        SetSelectedLocation: function(stage_index, card_index) {
            this.selected_stage_index = stage_index;
            this.selected_card_index = card_index;
        },
        // CleanSelectCache() {
        //     this.selected_card = {};
        // },
        GetMemberById(id) {
            return this.board.members.find((member) => (member._id == id));
        },
        UpdateDescriptionEdit: function() {
            if (this.selected_card && !this.selected_card.description) {
                this.isDesciptionEdit = true
            } else {
                this.isDesciptionEdit = false;
            }
        },
        LoadCardContent: function (stage_index, work_item_index) {
            this.SetSelectedLocation(stage_index, work_item_index);
            // 可能造成資料格式不一致
            this.selected_card = this.board.stage_list[stage_index].work_items[work_item_index];
            this.UpdateDescriptionEdit();

            this.selected_card.comments.forEach((comment) => {
                const member = this.GetMemberById(comment.userFk);
                if (member) {
                    comment.icon_url = member.icon_url;
                    comment.name = member.name;
                }
                else {
                    comment.icon_url = '/public/icon/profile/001-man.png';
                    comment.name = '---';
                }
            });
            this.selected_card.comments.sort((c1, c2) => {
                const d1 = new Date(c1.date); 
                const d2 = new Date(c2.date);
                return d2 - d1;
            })

            // 更新資料(member不存在memberList時，取回icon_url)
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
            setTimeout(() => {
                this.addCardInStage = -1;
            }, 200);
        },
        AddNewStage: function () {
            const rand = Math.floor(Math.random() * this.colorList.length)
            const randomColor = this.colorList[rand]
            this.board.stage_list.push({
                title: "New Stage",
                WIP_limit: 0,
                work_items: [],
                border_color: randomColor
            });

            const data = {
                boardId: this.boardId,
                stageTitle: "New Stage",
                border_color: randomColor
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
                userFk: this.loginUser._id,
                name:  this.loginUser.name,
                icon_url: this.loginUser.icon_url,
                text: comment,
                date: this.GetCurrentTime()
            });
            this.getSelectedCard.comments.splice(0, 0, {
                userFk: this.loginUser._id,
                name:  this.loginUser.name,
                icon_url: this.loginUser.icon_url,
                text: comment,
                date: this.GetCurrentTime()
            });
        },
        RemoveCard:function(){
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
        RemoveMember:function(member_index, memberId){
            this.board.members.splice(member_index, 1);
            const data = {
                boardId: this.boardId,
                userId: memberId
            };
            
            this.PerformAjax('/removeBoardMember', data, (res) => {
                if (memberId == this.loginUser._id) {
                    window.location.href = "/home";
                }
            });
        },
        AssignMember:function(memberId) {
            if (-1 == this.selected_card.assign.findIndex((assign) => (assign.userFk == memberId))) {
                this.selected_card.assign.push({userFk: memberId});
                this.getSelectedCard.assign.push({userFk: memberId});
                const data = this.getCardLocation;
                data.userId = memberId;
                this.PerformAjax('/assignMemberToCard', data, (res) => {
                    console.log(res);
                })
            } else {
                console.log('member has already been assigned');
            }
        },
        RemoveAssignMember: function(assign_index, memberId) {
            this.selected_card.assign.splice(assign_index, 1);
            this.getSelectedCard.assign.splice(assign_index, 1);
            const data = this.getCardLocation;
            data.userId = memberId;
            this.PerformAjax('/removeAssignedMemberFromCard', data, (res) => {
                console.log(res);
            });
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
        SelectColor: function(colorIndex) {
            if (this.selectColorIndex == colorIndex) {
                this.CleanSelectColor();
            } else {
                this.selectColorIndex = colorIndex;
                this.AddLabel();
            }
        },
        CleanSelectColor: function() {
            this.selectColorIndex = -1;
        },
        CancelAddLabel: function() {
            setTimeout(() => {
                // if (this.labelText.trim() != '') {
                    this.CleanSelectColor();
                    this.labelText = '';
                // }
            }, 200);
        },
        AddLabel: function() {
            if (this.labelText.trim() != '') {
                const label = {text: this.labelText};
                label.color = this.selectColorIndex == -1 ? this.colorList[0] : this.colorList[this.selectColorIndex];
                const data = {...this.getCardLocation, ...label};
                this.PerformAjax('/appendTagToCard', data, (res) => {
                    this.selected_card.tags.push(res);
                    this.getSelectedCard.tags.push(res);
                    console.log('add label successfully');
                });
                this.CleanSelectColor();
            }
            this.labelText = '';
        },
        RemoveLabel: function(label_index) {
            const data = this.getCardLocation;
            data.labelId = this.selected_card.tags[label_index]._id;
            this.PerformAjax('/removeLabelFromCard', data, (res) => {
                console.log(res);
            });
            this.selected_card.tags.splice(label_index, 1);
            this.getSelectedCard.tags.splice(label_index, 1);
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
                console.log(res);
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
            const data = {
                boardId: this.boardId,
                stageId: this.board.stage_list[evt.newIndex]._id,
                start_stage_index: evt.oldIndex,
                end_stage_index: evt.newIndex
            }
            this.PerformAjax('/moveStage', data, (res) => {
                console.log(res);
            });
            // console.log(evt.oldIndex, evt.newIndex);
        },
        GetMemberIconById(id) {
            const member = this.GetMemberById(id);
            if (member)
                return member.icon_url;
        },
        GetMemberEmailById(id) {
            const member = this.GetMemberById(id);
            if (member)
                return member.email;
        },
        GetMemberNameById(id) {
            const member = this.GetMemberById(id);
            if (member)
                return member.name;
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
        },
        getSelectedCard: function() {
            return this.board.stage_list[this.getSelectedStageIndex].work_items[this.getSelectedCardIndex];
        },
        isDesciptionOnEdit: function() {
            console.log(this.isDesciptionEdit)
            // if (this.selected_card && !this.selected_card.description) {
            //     this.isDesciptionEdit = true
            // }
            return this.isDesciptionEdit;
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