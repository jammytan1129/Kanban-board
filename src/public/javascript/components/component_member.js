// dropdown-member
Vue.component('dropdown-member', {
    data: function () {
      return {
        count: 0
      }
    },
    template: 
    `
    <div class="dropdown-menu nav-menu p-3" aria-labelledby="members" style="min-width:250px">
    <div class="input-group justify-content-between align-items-center">
        <h6></h6>
        <h6 class="text-center pt-2" style="font-weight:900;">Member</h6>
        <button type="button" class="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="dropdown-divider"></div>
    <div class="input-group" v-for="(member,member_index) in board.members">
        <div class="my-1 input-group d-flex align-items-center member-hover" style="border-bottom:1px solid;border-color:darkgray;"
            v-on:click="AssignMember(member._id)">
            <img class="mr-3 rounded-circle" :src="member.icon_url" style="width:40px; height: 40px;" alt="">
            <p class="m-0" style="font-weight:900;">&nbsp;{{ member.email }} ({{member.name}})</p>
        </div>
    </div>

</div>
    `
  })