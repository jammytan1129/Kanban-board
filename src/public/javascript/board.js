Vue.use('./public/javascript/user_info.vue')
var vm = new Vue({
    el: '#board',
    name: 'mfgActivity',
    data: {                        
        comment: '',
        selected_card: {},        
        boardName: 'FirstBoard',
        user: user_info,

        members: board.members,

        stage_list: board.stage_list,
    },

    watch: {

    },
    methods: {
        AddNewMember: function () {
            let email = $('#member-email').val();
            $('#member-email').val('');
            console.log(email);
            this.members.push({
                name: 'Peter',
                email:'peter@gmail.com',
                phone: '0912345677',
                nick_name: '小p',
                icon_url: 'public/icon/profile/001-man.png'
            });
        },
        LoadCardContent: function (stage_index, work_item_index) {
            this.selected_card = this.stage_list[stage_index].work_items[work_item_index];
            this.selected_card.index = work_item_index;
            console.log(this.selected_card);
        },
        AddNewCard: function (stage_index) {
            let cardTitle = $('#cardInput' + stage_index).val();
            console.log(cardTitle);
            
            $('#cardInput' + stage_index).css('display', 'none');
            $('#cardInputButton' + stage_index).hide();
            if(cardTitle == '') return
            this.stage_list[stage_index].work_items.push({
                title: cardTitle,
                description: '',
                comments: []
            });
        },
        ShowCardInput: function (stage_index) {
            $('#cardInput' + stage_index).show();
            $('#cardInputButton' + stage_index).show();                
        },
        UpdateComment: function () {
            console.log($('#description').val());

            this.selected_card.description = $('#description').val();
            // this.selected_card.de $('p').val();
            $('#description').val('');

        },
        AddNewStage: function () {

            this.stage_list.push({
                title: "New Stage",
                WIP_limit: 0,
                work_items: []
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
            this.stage_list[stage_index].work_items.splice(this.selected_card.index, 1);
        },
        RemoveStage:function(stage_index){
            this.stage_list.splice(stage_index, 1);
        },
        RemoveMember:function(member_index){
            this.members.splice(member_index, 1);
        },
        AssignMember:function(member_index) {
            if(this.selected_card.assign.findIndex((id) => (id === member_index)) === -1) {
                this.selected_card.assign.push(member_index);
            }
            console.log(this.selected_card.assign);
        }

    }
})