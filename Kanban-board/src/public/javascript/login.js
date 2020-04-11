var login = new Vue({
    el:'#login',
    data:{
        loginError:'',
        registerError:'',
        errors: [],
        nameError:'',
        name: null,
        emailError:'',
        email: null,
        passwordError:'',
        password:null,
        confirmPasswordError:'',
        confirmPassword:null,
    },
    methods: {
        CheckFormRegister: function (e) {
            this.errors = [];
    
            if (!this.name) {
                this.nameError = "Name required.";
                this.errors.push(this.nameError);
            }else{this.nameError=""}

            if (!this.email) {
                this.emailError = 'Email required.';
                this.errors.push(this.emailError);
            } else if (!this.validEmail(this.email)) {
                this.emailError = 'Valid email required.';
                this.errors.push(this.emailError);
            }else{this.emailError=""}

            if(!this.password){
                this.passwordError = "Password required";
                this.errors.push(this.passwordError);
            }else{this.passwordError=""}

            if(!this.confirmPassword){
                this.confirmPasswordError = "Confirm password required";
                this.errors.push(this.confirmPasswordError);
            }else if(this.confirmPassword != this.password){
                this.confirmPasswordError = "Password does not match the confirm password.";
                this.errors.push(this.confirmPasswordError);
            }else{this.confirmPasswordError=""}
           
            if (!this.errors.length) {
                this.Register();
            }
    
            e.preventDefault();
        },
        validEmail: function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        Register: function(){
            let email = $('#register-email').val();
            let password = $('#register-password').val();
            let name = $('#register-name').val();
            let icon_urls = [
                "/public/icon/profile/001-man.png",
                "/public/icon/profile/002-boy.png",
                "/public/icon/profile/003-girl.png",
                "/public/icon/profile/004-girl-1.png",
                "/public/icon/profile/005-girl-2.png",
                "/public/icon/profile/006-girl-3.png",
                "/public/icon/profile/007-girl-4.png",
                "/public/icon/profile/021-man-1.png",
                "/public/icon/profile/022-boy-1.png",
                "/public/icon/profile/025-boy-2.png"
            ]
            const random = Math.floor(Math.random() * icon_urls.length)
            let icon_url = icon_urls[random]
            console.log(icon_url);
        
            let payload = {
                email,
                password,
                name,
                icon_url
            };
            $.ajax({
                type : 'POST',
                url : '/register',
                data : payload,
                success : data => {
                    window.location.href = '/login';
                },
                error : (xhr, exception) => { 
                    console.log(xhr.responseText);
                }
            });
        }
    },
    mounted() {
        this.$refs.email.focus();
    }
})
function Login() {
    let email = $('#email').val();
    let password = $('#password').val();

    let payload = {
        email,
        password
    };
    $.ajax({
        type: 'POST',
        url: '/login',
        data: payload,
        success: isAuthenticed => {
            if (isAuthenticed)
                window.location.href = '/home';                
        },
        error: function (xhr, textStatus, error) {
            login.loginError = 'Incorrect email or passowrd';
            // console.log('incorrect email or password');
            // console.log(xhr.statusText);
            // console.log(textStatus);
            // console.log(error);
        }
    });
}

$('#login-btn').click(Login);
$('#password').keyup((e) => {
    const code = e.which;
    if (code == 13)
        Login();
});